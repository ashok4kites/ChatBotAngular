import { LoginPage } from 'app/modules/auth/pages/login/login.page';
import { ForgotPasswordPage } from 'app/modules/auth/pages/forgot-password/forgot-password.page';
import { ResetPasswordPage } from 'app/modules/auth/pages/reset-password/reset-password.page';
import { TwoFactorAuthenticationPage } from 'app/modules/auth/pages/two-factor-authentication/two-factor-authentication.page';

import { AuthGuard } from "./guards/auth/auth.guard";
import { AuthValidateGuard } from "./guards/auth/auth-validate.guard";
import { AuthCompleteGuard } from "./guards/auth/auth-complete.guard";
import { ChatApplicationPage} from "app/modules/chatbot/pages/chatbotpage.component";

export const ROUTES = [
  {
    path: '',
    redirectTo: 'athena',
    pathMatch: 'full',
  },
  {
    path: 'athena',
    component: ChatApplicationPage
  },
  {
    path: 'login',
    component: LoginPage,
    canActivate: [ AuthCompleteGuard ]
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordPage,
    canActivate: [ AuthCompleteGuard ]
  },
  {
    path: 'reset-password',
    component: ResetPasswordPage,
    canActivate: [ AuthCompleteGuard ]
  },
  {
    path: 'two-factor-authentication',
    component: TwoFactorAuthenticationPage,
    canActivate: [ AuthCompleteGuard ]
  },
]
