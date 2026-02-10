import { createClient } from '@/lib/supabase/client'

const supabase = createClient()

export async function getIncomingRequests(userId: string) {
  return await supabase
    .from('session_request')
   
}

export async function getOutgoingRequests(userId: string) {
  return await supabase
    .from('session_request')
    
}

export async function getCompletedSessions(userId: string) {
  return await supabase
    .from('session')
    
}
