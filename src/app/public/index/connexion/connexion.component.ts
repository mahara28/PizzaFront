import { SocialAuthService, GoogleLoginProvider, FacebookLoginProvider, SocialUser } from '@abacritt/angularx-social-login';
import { AfterViewInit, Component, EventEmitter, HostListener, NgZone, Output } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { jwtDecode } from "jwt-decode";

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements AfterViewInit {
  @Output() close = new EventEmitter<void>();

  user: SocialUser | undefined;
  loggedIn: boolean = false;
  jwtToken: string | null = null;
  constructor(private authService: SocialAuthService, private router: Router, private ngZone: NgZone) { }

  // Fermer le popup avec la touche Échap
  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    this.closePopup();
  }

  ngOnInit() {
    /* this.authService.authState.subscribe((user) => {
     this.user = user;
     this.loggedIn = (user != null);
     console.log(user);
   }); */
  }
  ngAfterViewInit(): void {
    // Vérifie que la variable google existe
    if ((window as any).google) {
      (window as any).google.accounts.id.initialize({
        client_id: environment.CLIENT_ID_GOOGLE,
        callback: (response: any) => this.handleCredentialResponse(response)
      });

      (window as any).google.accounts.id.renderButton(
        document.getElementById('googleSignInButton'),
        { theme: 'outline', size: 'large' }
      );

      (window as any).google.accounts.id.prompt(); // Affiche automatiquement le prompt si nécessaire
    }
  }

  handleCredentialResponse(response: any) {
    this.jwtToken = response.credential;
    console.log('Token JWT Google:', this.jwtToken);

    // Décoder le JWT pour récupérer les informations de l'utilisateur
    const decodedToken: any = jwtDecode(response.credential);
    console.log('Decoded Token:', decodedToken.nom+decodedToken.prenom);
    sessionStorage.setItem("userInfo",JSON.stringify(decodedToken))

    this.loggedIn = true;
    localStorage.setItem("jwtToken", response.credential);

    this.ngZone.run(() => {
      this.router.navigate(['/auth/commande']);
    });
  }




  signInWithFacebook(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }

  closePopup() {
    this.close.emit();
  }

  onSubmit(event: Event) {
    event.preventDefault();
    // Ici, vous ajouterez la logique de soumission du formulaire
    console.log('Formulaire soumis');
    // this.closePopup(); // Décommentez pour fermer après soumission
  }
}
