
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pnmqszwishmdwuwronwi.supabase.co'
const supabaseKey = 'sb_publishable_b3Ur_dFSZMKOIAKkgMzn0A_RLevlh6U'

export const supabase = createClient(supabaseUrl, supabaseKey)
