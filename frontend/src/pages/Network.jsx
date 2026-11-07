import React, { useEffect, useState, useContext } from 'react'
import Nav from '../component/Nav'
import axios from 'axios'
import { authdatacontext } from '../context/AuthContext.jsx'
import profile from '../assets/profile.webp'
import ConnectionButton from '../component/ConnectionButton'
import WithdrawConnectionButton from '../component/WithdrawConnectionButton'
import { FaUserFriends } from 'react-icons/fa'
import { HiCheck, HiXMark } from 'react-icons/hi2'
import logger from '../utils/logger'
import Avatar from '../component/ui/Avatar'
import Button from '../component/ui/Button'
import EmptyState from '../component/ui/EmptyState'
import { UserCardSkeleton } from '../component/ui/Skeleton'

function Network() {
  const { serverURL } = useContext(authdatacontext)
  const [requests, setRequests] = useState([])
  const [sentRequests, setSentRequests] = useState([])
  const [suggestedUsers, setSuggestedUsers] = useState([])
  const [connections, setConnections] = useState([])
  const [requestTab, setRequestTab] = useState('received')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    try {
      const [reqRes, sugRes, connRes, sentRes] = await Promise.allSettled([
        axios.get(`${serverURL}/api/v1/connection/requests`, { withCredentials: true }),
        axios.get(`${serverURL}/api/v1/user/suggestedUsers`, { withCredentials: true }),
        axios.get(`${serverURL}/api/v1/connection/`, { withCredentials: true }),
        axios.get(`${serverURL}/api/v1/connection/sent-requests`, { withCredentials: true })
      ])

      if (reqRes.status === 'fulfilled' && reqRes.value.data?.requests) {
        setRequests(reqRes.value.data.requests)
      }

      if (sentRes.status === 'fulfilled' && sentRes.value.data?.sentRequests) {
        const sRequests = sentRes.value.data.sentRequests
        setSentRequests(sRequests)
        if (!reqRes.value.data?.requests?.length && sRequests.length > 0) {
          setRequestTab('sent')
        }
      }

      if (sugRes.status === 'fulfilled' && sugRes.value.data?.getSuggestedUsers) {
        setSuggestedUsers(sugRes.value.data.getSuggestedUsers)
      }

      if (connRes.status === 'fulfilled') {
        const connData = connRes.value.data
        if (Array.isArray(connData)) {
          setConnections(connData)
        } else if (Array.isArray(connData?.connections)) {
          setConnections(connData.connections)
        }
      }

      if (
        reqRes.status === 'rejected' &&
        sugRes.status === 'rejected' &&
        connRes.status === 'rejected' &&
        sentRes.status === 'rejected'
      ) {
        setError('Unable to load network data at this time.')
        logger.error('Failed to load network data:', reqRes.reason || sugRes.reason || connRes.reason)
      }
    } catch (err) {
      setError('An unexpected error occurred while loading network.')
      logger.error('Network fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleAcceptRequest = async (requestId) => {
    try {
      await axios.put(`${serverURL}/api/v1/connection/accept/${requestId}`, {}, { withCredentials: true })
      const acceptedRequest = requests.find((request) => request._id === requestId)
      setRequests((prev) => prev.filter((request) => request._id !== requestId))
      if (acceptedRequest?.sender) {
        setConnections((prev) => [acceptedRequest.sender, ...prev])
      }
    } catch (err) {
      logger.error('Error accepting connection request:', err)
    }
  }

  const handleRejectRequest = async (requestId) => {
    try {
      await axios.put(`${serverURL}/api/v1/connection/reject/${requestId}`, {}, { withCredentials: true })
      setRequests((prev) => prev.filter((request) => request._id !== requestId))
    } catch (err) {
      logger.error('Error rejecting connection request:', err)
    }
  }

  const handleWithdrawSentRequest = async (targetUserId, requestId) => {
    try {
      await axios.delete(`${serverURL}/api/v1/connection/withdraw/${targetUserId}`, {
        withCredentials: true
      })
      setSentRequests((prev) => prev.filter((request) => request._id !== requestId))
    } catch (err) {
      logger.error('Error withdrawing sent request:', err)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const hasContent =
    requests.length > 0 ||
    sentRequests.length > 0 ||
    suggestedUsers.length > 0 ||
    connections.length > 0

  return (
    <div className="w-full min-h-screen pt-20 pb-20 px-4 sm:px-6 flex flex-col items-center">
      <Nav />

      {/* Main Container */}
      <div className="w-full max-w-2xl flex flex-col gap-6">
        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col gap-4">
            <UserCardSkeleton />
            <UserCardSkeleton />
            <UserCardSkeleton />
          </div>
        ) : error ? (
          /* Error State */
          <div className="w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm border border-slate-200/80 dark:border-slate-800 rounded-3xl flex flex-col items-center justify-center p-8 text-center gap-4">
            <p className="text-sm text-rose-600 font-medium">{error}</p>
            <Button variant="primary" size="sm" onClick={fetchData}>
              Retry
            </Button>
          </div>
        ) : !hasContent ? (
          /* Genuine Empty State */
          <EmptyState
            icon={FaUserFriends}
            title="Your network is quiet"
            description="No connection requests, invitations, or suggestions available right now. Keep exploring to connect with engineers you know!"
          />
        ) : (
          /* Content Sections */
          <>
            {/* Invitations Section */}
            {(requests.length > 0 || sentRequests.length > 0) && (
              <section aria-label="Connection invitations" className="flex flex-col gap-3">
                {/* Section Header with Tabs */}
                <div className="w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm border border-slate-200/80 dark:border-slate-800 rounded-2xl sm:rounded-3xl flex flex-wrap items-center justify-between p-4 sm:px-6 gap-3">
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display">
                    Invitations
                  </h2>
                  <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200/60 dark:border-slate-700">
                    <button
                      type="button"
                      onClick={() => setRequestTab('received')}
                      className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                        requestTab === 'received'
                          ? 'bg-white dark:bg-slate-900 text-brand shadow-xs'
                          : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      Received ({requests.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setRequestTab('sent')}
                      className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                        requestTab === 'sent'
                          ? 'bg-white dark:bg-slate-900 text-brand shadow-xs'
                          : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      Sent ({sentRequests.length})
                    </button>
                  </div>
                </div>

                {/* Received List */}
                {requestTab === 'received' ? (
                  requests.length > 0 ? (
                    <div className="flex flex-col gap-3">
                      {requests.map((request) => (
                        <div
                          key={request._id}
                          className="w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-xs hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4"
                        >
                          <div className="flex items-center gap-3.5 min-w-0">
                            <Avatar
                              src={request.sender?.profileImage || profile}
                              name={`${request?.sender?.firstname || ''} ${request?.sender?.lastname || ''}`}
                              size="lg"
                            />
                            <div className="flex flex-col min-w-0">
                              <span className="text-slate-900 dark:text-white font-bold text-sm sm:text-base truncate">
                                {`${request?.sender?.firstname || ''} ${request?.sender?.lastname || ''}`}
                              </span>
                              <span className="text-xs text-slate-500 truncate">
                                {request?.sender?.headline || 'Engineer'}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 self-end sm:self-auto flex-shrink-0">
                            <Button
                              variant="primary"
                              size="sm"
                              icon={HiCheck}
                              onClick={() => handleAcceptRequest(request._id)}
                            >
                              Accept
                            </Button>
                            <Button
                              variant="dangerOutline"
                              size="sm"
                              icon={HiXMark}
                              onClick={() => handleRejectRequest(request._id)}
                            >
                              Reject
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="w-full bg-white/60 dark:bg-slate-900/60 rounded-2xl p-6 text-center text-xs sm:text-sm text-slate-500 border border-slate-200/60 dark:border-slate-800">
                      No pending invitations received.
                    </div>
                  )
                ) : sentRequests.length > 0 ? (
                  <div className="flex flex-col gap-3">
                    {sentRequests.map((request) => (
                      <div
                        key={request._id}
                        className="w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-xs hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4"
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <Avatar
                            src={request.receiver?.profileImage || profile}
                            name={`${request?.receiver?.firstname || ''} ${request?.receiver?.lastname || ''}`}
                            size="lg"
                          />
                          <div className="flex flex-col min-w-0">
                            <span className="text-slate-900 dark:text-white font-bold text-sm sm:text-base truncate">
                              {`${request?.receiver?.firstname || ''} ${request?.receiver?.lastname || ''}`}
                            </span>
                            <span className="text-xs text-slate-500 truncate">
                              {request?.receiver?.headline || 'Engineer'}
                            </span>
                          </div>
                        </div>

                        <div className="self-end sm:self-auto flex-shrink-0">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() =>
                              handleWithdrawSentRequest(request.receiver?._id, request._id)
                            }
                          >
                            Withdraw
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="w-full bg-white/60 dark:bg-slate-900/60 rounded-2xl p-6 text-center text-xs sm:text-sm text-slate-500 border border-slate-200/60 dark:border-slate-800">
                    No pending sent invitations.
                  </div>
                )}
              </section>
            )}

            {/* My Connections Section */}
            {connections.length > 0 && (
              <section aria-label="My connections" className="flex flex-col gap-3">
                <div className="w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm border border-slate-200/80 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:px-6">
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display">
                    My Connections ({connections.length})
                  </h2>
                </div>

                <div className="flex flex-col gap-3">
                  {connections.map((user) => (
                    <div
                      key={user._id}
                      className="w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-xs hover:shadow-md transition-all duration-200 flex items-center justify-between gap-4 p-4"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <Avatar
                          src={user.profileImage || profile}
                          name={`${user?.firstname || ''} ${user?.lastname || ''}`}
                          size="lg"
                        />
                        <div className="flex flex-col min-w-0">
                          <span className="text-slate-900 dark:text-white font-bold text-sm sm:text-base truncate">
                            {`${user?.firstname || ''} ${user?.lastname || ''}`}
                          </span>
                          <span className="text-xs text-slate-500 truncate">
                            {user?.headline || 'Connected Member'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Suggestions Section */}
            {suggestedUsers.length > 0 && (
              <section aria-label="People you may know" className="flex flex-col gap-3">
                <div className="w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm border border-slate-200/80 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:px-6">
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display">
                    People You May Know ({suggestedUsers.length})
                  </h2>
                </div>

                <div className="flex flex-col gap-3">
                  {suggestedUsers.map((user) => (
                    <div
                      key={user._id}
                      className="w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-xs hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <Avatar
                          src={user.profileImage || profile}
                          name={`${user?.firstname || ''} ${user?.lastname || ''}`}
                          size="lg"
                        />
                        <div className="flex flex-col min-w-0">
                          <span className="text-slate-900 dark:text-white font-bold text-sm sm:text-base truncate">
                            {`${user?.firstname || ''} ${user?.lastname || ''}`}
                          </span>
                          <span className="text-xs text-slate-500 truncate">
                            {user?.headline || `@${user?.username || 'member'}`}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-auto flex-shrink-0">
                        <ConnectionButton userId={user._id} />
                        <WithdrawConnectionButton userId={user._id} />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Network
