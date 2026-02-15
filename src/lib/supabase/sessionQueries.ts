import { createClient } from '@/lib/supabase/client'

const supabase = createClient()

export async function getIncomingRequests(userId: string) {
  return await supabase
    .from('session_request')
      .select(`
      session_request_id,
      status,
      created_at,
      description,
      advertisement(title),
      request_from_user:user!session_request_request_from_user_id_fkey(name)
    `)
    .eq('request_to_user_id', userId)
    .eq('status', 'pending')
   
}

export async function getAcceptedRequests(userId: string) {
    return await supabase
    .from('session_request')
       .select(`
        session_request_id,
        status,
        description,
        availability(start_time),
        advertisement(title),
        request_from_user:user!session_request_request_from_user_id_fkey(name)
       `)
    .eq('request_to_user_id', userId)
    .eq('status', 'accepted')
}

export async function getOutgoingRequests(userId: string) {
  return await supabase
    .from('session_request')
      .select(`
      session_request_id,
      status,
      created_at,
      description,
      advertisement(title),
      request_to_user:user!session_request_request_to_user_id_fkey(name)
    `)
    .eq('request_from_user_id', userId)
}

export async function getCompletedSessions(userId: string) {
  return await supabase
    .from('session')
    .select(`
      session_id,
      start_time,
      description,
      advertisement(title),
      teacher_user_id,
      student_user_id,
      teacher:user!session_teacher_fkey(name),
      student:user!session_student_fkey(name)
    `)
    .or(`teacher_user_id.eq.${userId},student_user_id.eq.${userId}`)
    .eq('status', 'completed')
}

export async function getActiveSessions(userId: string) {
  return await supabase
    .from('session')
    .select(`
      session_id,
      start_time,
      end_time,
      advertisement(title),
      teacher_user_id,
      student_user_id,
      teacher:user!session_teacher_fkey(name),
      student:user!session_student_fkey(name)
    `)
    .or(`teacher_user_id.eq.${userId},student_user_id.eq.${userId}`)
    .eq('status', 'accepted')
}
