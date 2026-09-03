export type Role = 'chooser' | 'be-chosen' | 'admin'

export interface Profile {
  id: string
  name: string
  age: number
  city: string
  bio: string
  occupation?: string
  interests: string[]
  languages: string[]
  relationshipGoal: string
  verified: boolean
  distance: number
  online: boolean
  vibe: string
  accent: string
}

export interface Conversation {
  id: string
  name: string
  role: string
  preview: string
  unread: number
  online: boolean
  verified: boolean
}
