import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { AuthSignInComponent } from 'app/modules/auth/sign-in/sign-in.component';
import { authSignInRoutes } from 'app/modules/auth/sign-in/sign-in.routing';

@NgModule({
    declarations: [
        AuthSignInComponent
    ],
    imports: [
        RouterModule.forChild(authSignInRoutes),
        SharedModule
    ]
})
export class AuthSignInModule {
}
