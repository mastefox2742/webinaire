# Confirmation d'inscription avec n8n

## Variables Vercel

Ajouter ces deux variables dans les environnements Production, Preview et Development :

```text
N8N_INSCRIPTION_WEBHOOK_URL=https://votre-n8n.example/webhook/confirmation-inscription
N8N_WEBHOOK_SECRET=une-valeur-longue-et-aleatoire
```

Redéployer ensuite l'application.

## Workflow n8n

1. Créer un nœud **Webhook** :
   - méthode : `POST`
   - chemin : `confirmation-inscription`
   - authentification : `Header Auth`
   - nom de l'en-tête : `Authorization`
   - valeur : `Bearer <la même valeur que N8N_WEBHOOK_SECRET>`
   - réponse : après l'exécution du dernier nœud
2. Ajouter un nœud d'envoi d'email (Gmail ou SMTP) et connecter son compte.
3. Utiliser les expressions suivantes :
   - destinataire : `{{ $json.body.inscrit.email }}`
   - objet : `Inscription confirmée — {{ $json.body.webinaire.title }}`
   - nom : `{{ $json.body.inscrit.nom }}`
   - date : `{{ $json.body.webinaire.date }}`
   - lien : `{{ $json.body.webinaire.callLink }}`
4. Activer le workflow et copier son URL de production dans Vercel.

Le webhook reçoit uniquement les données nécessaires à la confirmation. Une erreur n8n
n'annule pas l'inscription Firestore ; elle est enregistrée dans les logs Vercel et peut
être renvoyée depuis le panneau d'administration.
