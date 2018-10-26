import { ErrorCodesPage } from './pages/error-codes/error-codes.page';
import { AuthGuard } from '../../../core/guards/auth/auth.guard';

export const ROUTES = [
  { path: 'error/:code', component: ErrorCodesPage, canActivate: [AuthGuard] },
  { path: 'public/error/:code', component: ErrorCodesPage, canActivate: [] }
]
