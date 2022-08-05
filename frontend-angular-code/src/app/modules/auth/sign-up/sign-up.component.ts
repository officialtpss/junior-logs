import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { CryptoSecurityService } from 'app/services/crypto-security.service';

@Component({
    selector: 'auth-sign-up',
    templateUrl: './sign-up.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AuthSignUpComponent implements OnInit {
    @ViewChild('signUpNgForm') signUpNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: ''
    };
    signUpForm: UntypedFormGroup;
    showAlert: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _formBuilder: UntypedFormBuilder,
        private _router: Router,
        private _crypto: CryptoSecurityService
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the form
        this.signUpForm = this._formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            agreements: ['', Validators.requiredTrue],
            role: ['systemAdmin']
        }
        );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign up
     */
    signUp(): void {
        // Do nothing if the form is invalid
        if (this.signUpForm.invalid) {
            return;
        }

        // Disable the form
        this.signUpForm.disable();

        // Hide the alert
        this.showAlert = false;
        // Sign up
        let signUpForm = this.signUpForm.value
        signUpForm.password = this._crypto.encrypt(signUpForm.password);
        this._authService.signUp(signUpForm)
            .subscribe({
                next: response => {
                    // Navigate to the confirmation required page
                    this._router.navigateByUrl('/confirmation-required');
                },
                error: ({ error }) => {
                    // Re-enable the form
                    this.signUpForm.enable();

                    // Reset the form
                    //  this.signUpNgForm.resetForm();

                    // Set the alert
                    this.alert = {
                        type: 'error',
                        message: error?.message || 'Something went wrong, please try again.'
                    };

                    // Show the alert
                    this.showAlert = true;
                }

            });
    }
}
