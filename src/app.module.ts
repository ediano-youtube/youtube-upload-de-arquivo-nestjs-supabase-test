import { Module } from '@nestjs/common';
import { ModulesModule } from './modules/modules.module';
import { SupabaseModule } from './libs/supabase/supabase.module';

@Module({
  imports: [ModulesModule, SupabaseModule]
})
export class AppModule {}
