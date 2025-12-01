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
  facebookReady = false;

  // Fermer le popup avec la touche Échap
  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    this.closePopup();
  }

  ngOnInit() {

    this.styleGoogleButton()

    window.addEventListener('fb-sdk-ready', () => {
      this.facebookReady = true;
    });

  }
  private styleGoogleButton() {
    const checkButton = setInterval(() => {
      const googleButton = document.querySelector('#googleSignInButton .nsm7Bb-HzV7m-LgbsSe') as HTMLElement;

      if (googleButton) {
        // Style principal
        googleButton.style.cssText = `
        width: 50px !important;
        height: 50px !important;
        border-radius: 50% !important;
        padding: 0 !important;
        min-width: auto !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        overflow: hidden !important;
      `;

        // Cacher le texte
        const textSpan = googleButton.querySelector('.nsm7Bb-HzV7m-LgbsSe-BPrWId') as HTMLElement;
        if (textSpan) textSpan.style.display = 'none';

        // Centrer l'icône
        const svgContainer = googleButton.querySelector('.nsm7Bb-HzV7m-LgbsSe-Bz112c') as HTMLElement;
        if (svgContainer) {
          svgContainer.style.cssText = `
          margin: 11px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          width: 26px;
        `;
        }

        clearInterval(checkButton);
      }
    }, 100);
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
    console.log('Decoded Token:', decodedToken.nom + decodedToken.prenom);
    sessionStorage.setItem("userInfo", JSON.stringify(decodedToken))

    this.loggedIn = true;
    sessionStorage.setItem("jwtToken", response.credential);

    this.ngZone.run(() => {
      this.router.navigate(['/auth/commande']);
    });
  }

  loginWithFacebook() {

    if (!this.facebookReady) {
      console.warn("SDK Facebook pas prêt");
      return;
    }

    (window as any).FB.login((response: any) => {
      console.log(response)
      if (response.authResponse) {
        console.log("Connecté via Facebook :", response);
        this.handleFacebookResponse(response);
      } else {
        console.warn("Connexion Facebook annulée.");
      }

    }, { scope: 'email,public_profile', return_scopes: true });
  }
  handleFacebookResponse(response: any) {
    const accessToken = response.authResponse.accessToken;

    // récupérer le profile :
    (window as any).FB.api('/me', { fields: 'id,name,email,picture' }, (user: any) => {
      console.log("Données utilisateur Facebook :", user);
      // envoyer au backend
      this.ngZone.run(() => {
        this.router.navigate(['/auth/commande']);
      });
    });
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
