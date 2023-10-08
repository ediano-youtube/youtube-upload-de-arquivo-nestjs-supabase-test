import { Global, Module } from '@nestjs/common';

import { SupabaseService } from './supabase.service';
import { SupabaseProvider } from './supabase.provider';

@Global()
@Module({
  providers: [SupabaseService, SupabaseProvider],
  exports: [SupabaseService],
})
export class SupabaseModule {}
