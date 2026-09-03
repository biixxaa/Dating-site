import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Mic, Paperclip, Phone, SendHorizontal, Video, ShieldCheck } from 'lucide-react'
import { conversations as initialConversations, featuredProfiles } from '../data/mockData'

interface Message {
  id: string
  sender: 'me' | 'them'
  text: string
  timestamp: string
}

interface ChatPageProps {
  activeChatId: string | null
  onClearActiveChat: () => void
}

export function ChatPage({ activeChatId, onClearActiveChat }: ChatPageProps) {
  const [convs, setConvs] = useState(initialConversations)
  const [selectedConvId, setSelectedConvId] = useState<string>('c1')
  const [inputText, setInputText] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const [msgs, setMsgs] = useState<Record<string, Message[]>>({
    c1: [
      { id: '1', sender: 'them', text: 'Your profile stood out immediately. Want to trade favorite city escapes?', timestamp: '3:40 PM' },
      { id: '2', sender: 'me', text: 'That’s a lovely opener. I’m a big fan of private dinners, good music, and long conversations.', timestamp: '3:41 PM' },
    ],
    c2: [
      { id: '1', sender: 'them', text: 'I love the idea of a private dinner and a slow walk after.', timestamp: 'Yesterday' },
    ],
  })

  // Auto-select or add a new conversation if activeChatId is set from the Browse page
  useEffect(() => {
    if (activeChatId) {
      const existingConv = convs.find((c) => c.id === activeChatId || c.name.toLowerCase() === activeChatId.toLowerCase())
      
      if (existingConv) {
        setSelectedConvId(existingConv.id)
      } else {
        // If profile exists in featuredProfiles but not in conversations, create one
        const profile = featuredProfiles.find((p) => p.id === activeChatId)
        if (profile) {
          const newConvId = `c_${profile.id}`
          const newConv = {
            id: newConvId,
            name: profile.name,
            role: profile.occupation || 'Member',
            preview: 'Start a new conversation',
            unread: 0,
            online: profile.online,
            verified: profile.verified,
          }
          setConvs((prev) => [newConv, ...prev])
          setMsgs((prev) => ({
            ...prev,
            [newConvId]: [],
          }))
          setSelectedConvId(newConvId)
        }
      }
      onClearActiveChat()
    }
  }, [activeChatId, convs, onClearActiveChat])

  // Scroll to the bottom of the message thread on updates
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [msgs, selectedConvId])

  const activeConv = convs.find((c) => c.id === selectedConvId)
  const activeMessages = msgs[selectedConvId] || []

  const handleSend = () => {
    if (!inputText.trim()) return

    const newMessageId = String(Date.now())
    const newMessage: Message = {
      id: newMessageId,
      sender: 'me',
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    // Update message state
    setMsgs((prev) => ({
      ...prev,
      [selectedConvId]: [...(prev[selectedConvId] || []), newMessage],
    }))

    // Update inbox preview text
    setConvs((prev) =>
      prev.map((c) => (c.id === selectedConvId ? { ...c, preview: inputText, unread: 0 } : c))
    )

    const sentText = inputText
    setInputText('')

    // Simulate an auto-reply after 1.5 seconds
    setTimeout(() => {
      const replyText = getSimulatedReply(activeConv?.name || 'Match', sentText)
      const replyMessage: Message = {
        id: String(Date.now() + 1),
        sender: 'them',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }

      setMsgs((prev) => ({
        ...prev,
        [selectedConvId]: [...(prev[selectedConvId] || []), replyMessage],
      }))

      setConvs((prev) =>
        prev.map((c) => (c.id === selectedConvId ? { ...c, preview: replyText } : c))
      )
    }, 1500)
  }

  const getSimulatedReply = (name: string, userText: string): string => {
    const text = userText.toLowerCase()
    if (text.includes('hello') || text.includes('hi') || text.includes('hey')) {
      return `Hey! Glad you messaged. How is your day going?`
    }
    if (text.includes('coffee') || text.includes('dinner') || text.includes('date') || text.includes('meet')) {
      return `I would love to meet up for that! I value authentic interactions. Should we coordinate for this weekend?`
    }
    return `That sounds wonderful. I appreciate you sharing that with me. I feel like we have very similar vibes, ${name}!`
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 px-4 py-10 text-slate-800 dark:text-slate-100 transition-colors duration-300 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        
        {/* Inbox Column */}
        <section className="rounded-[2rem] border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/80 p-4 shadow-xl">
          <div className="mb-4 px-2">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Inbox</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Private conversations are secured and designed for fast, respectful exchanges.</p>
          </div>
          <div className="space-y-3">
            {convs.map((conversation) => {
              const isSelected = conversation.id === selectedConvId
              return (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedConvId(conversation.id)}
                  className={`rounded-2xl border p-4 cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? 'border-fuchsia-500 bg-fuchsia-500/10 dark:bg-fuchsia-500/20'
                      : 'border-slate-100 dark:border-white/10 bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-slate-900 dark:text-white">{conversation.name}</p>
                        {conversation.verified && <ShieldCheck size={14} className="text-fuchsia-500 dark:text-fuchsia-300" />}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-450">{conversation.role}</p>
                    </div>
                    {conversation.unread > 0 && (
                      <span className="rounded-full bg-fuchsia-500 px-2 py-0.5 text-2xs font-semibold text-white">{conversation.unread}</span>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-350 truncate">{conversation.preview}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Messaging Area */}
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[2rem] border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/80 p-4 shadow-xl flex flex-col min-h-[500px]"
        >
          {activeConv ? (
            <>
              {/* Message Header */}
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 px-2 pb-4">
                <div className="flex items-center gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-lg font-semibold text-slate-900 dark:text-white">{activeConv.name}</p>
                      {activeConv.verified && <ShieldCheck size={16} className="text-fuchsia-500 dark:text-fuchsia-300" />}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {activeConv.online ? 'Online' : 'Away'} · Verified member
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="rounded-full border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10"><Phone size={16} /></button>
                  <button className="rounded-full border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10"><Video size={16} /></button>
                </div>
              </div>

              {/* Message Stream */}
              <div className="flex-1 overflow-y-auto mt-6 space-y-4 px-2 max-h-[350px] min-h-[300px]">
                {activeMessages.map((message) => {
                  const isMe = message.sender === 'me'
                  return (
                    <div
                      key={message.id}
                      className={`max-w-[75%] rounded-2xl p-3 text-sm shadow-sm ${
                        isMe
                          ? 'ml-auto bg-fuchsia-500/10 dark:bg-fuchsia-500/25 text-fuchsia-900 dark:text-fuchsia-100 border border-fuchsia-200 dark:border-fuchsia-500/20'
                          : 'bg-slate-100 dark:bg-white/10 text-slate-805 dark:text-slate-200 border border-slate-200/50 dark:border-white/5'
                      }`}
                    >
                      <p className="leading-5">{message.text}</p>
                      <span className="mt-1 block text-3xs text-right text-slate-450 dark:text-slate-500">{message.timestamp}</span>
                    </div>
                  )
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input Container */}
              <div className="mt-4 rounded-[1.5rem] border border-slate-200 dark:border-white/10 bg-slate-100/50 dark:bg-white/5 p-3">
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleSend()
                  }}
                  className="flex items-center gap-2 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-950/70 px-3 py-2"
                >
                  <button type="button" className="text-slate-400 hover:text-slate-600 dark:hover:text-white"><Paperclip size={16} /></button>
                  <input
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="flex-1 bg-transparent text-sm text-slate-900 dark:text-white outline-none"
                    placeholder="Send a thoughtful message..."
                  />
                  <button type="button" className="rounded-full bg-slate-100 dark:bg-white/10 p-2 text-slate-500 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-white/20"><Mic size={16} /></button>
                  <button
                    type="submit"
                    className="rounded-full bg-fuchsia-500 p-2 text-white transition hover:bg-fuchsia-400 active:scale-95"
                  >
                    <SendHorizontal size={16} />
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-center p-8">
              <p className="text-slate-500 dark:text-slate-400">Select a conversation to begin chatting.</p>
            </div>
          )}
        </motion.section>
      </div>
    </main>
  )
}

