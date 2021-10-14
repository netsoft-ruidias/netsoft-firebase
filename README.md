# Netsoft's react hooks for firebase

![minzipped size](https://img.shields.io/bundlephobia/minzip/@netsoft/firebase?style=for-the-badge)
![downloads](https://img.shields.io/npm/dt/@netsoft/firebase?style=for-the-badge)
![license](https://img.shields.io/npm/l/@netsoft/firebase?style=for-the-badge)

![open issues](https://img.shields.io/github/issues-raw/netsoft-ruidias/netsoft-firebase?style=for-the-badge)
![pull requests](https://img.shields.io/github/issues-pr/netsoft-ruidias/netsoft-firebase?style=for-the-badge)
![contributors](https://img.shields.io/github/contributors/netsoft-ruidias/netsoft-firebase?style=for-the-badge)
![last commit](https://img.shields.io/github/last-commit/netsoft-ruidias/netsoft-firebase?style=for-the-badge)

![alpha version](https://img.shields.io/npm/v/@netsoft/firebase?label=Alpha%20Version&style=for-the-badge)
![react dependency version](https://img.shields.io/npm/dependency-version/@netsoft/firebase/react?style=for-the-badge)
![firebase dependency version](https://img.shields.io/npm/dependency-version/@netsoft/firebase/firebase?style=for-the-badge)

# Firebase Hooks

Collection of React Hooks for Firebase v9.

The Firebase Web SDK is designed to work with module bundlers to remove any unused code (tree-shaking).

The purpose of this package is to facilitate the use of firebase tools. So, as it is implemented, it doesn't take advantage of the modular concept implemented in v9 of firebase, so if you want to take advantage of tree-shaking, you shouldn't use this package.

If you want to learn more about tree-shaking, please check this article [Using module bundlers with Firebase](https://firebase.google.com/docs/web/module-bundling).

## Installation

1. Install the Firebase NPM module and this package:
    ```bash
    $ npm init
    $ npm install --save firebase
    $ npm install --save @netsoft/firebase
    ```
2. Create a new app using the `create-react-app` (or use your own app, if already exists)

3. Create a Firestore App (or you can use your own)

    > If you haven't already, create a Firebase project: In the Firebase console, click **Add project**, then follow the on-screen instructions to create a Firebase project or to add Firebase services to an existing GCP project.

4. Edit your `index.js` and inject the `FirebaseProvider` with your app's Firebase project configuration

    To initialize Firebase in your app, you need to provide your app's Firebase project configuration. You can [obtain your Firebase config object](https://support.google.com/firebase/answer/7015592) at any time.

    ```javascript
    import { FirebaseProvider } from "@netsoft/firebase";

    // TODO: Replace the following with your app's Firebase project configuration
    const firebaseConfig = {
        apiKey: "<apiKey>",
        authDomain: "<projectId>.firebaseapp.com",
        databaseURL: "https://<projectId>.firebaseio.com",
        projectId: "<projectId>",
        storageBucket: "projectId.appspot.com",
        messagingSenderId: "<messagingSenderId>",
        appId: "<appId>",
    };

    ReactDOM.render(
        <React.StrictMode>
            <FirebaseProvider config={firebaseConfig}>
                <App />
            </FirebaseProvider>
        </React.StrictMode>,
        document.getElementById("root")
    );
    ```

5. That's it! You are now ready to go...

# Usage

Instructions will come soon, stay tuned...

## Authentication

Most apps need to know the identity of a user. Knowing a user's identity allows an app to securely save user data in the cloud and provide the same personalized experience across all of the user's devices.
Firebase Authentication provides backend services, easy-to-use SDKs, and ready-made UI libraries to authenticate users to your app. It supports authentication using passwords, phone numbers, popular federated identity providers like Google, Facebook and Twitter, and more.

Firebase Authentication integrates tightly with other Firebase services, and it leverages industry standards like OAuth 2.0 and OpenID Connect, so it can be easily integrated with your custom backend.

Before you start. Firebase offers an alternative to this SDK if you only need Authentication in your app.

### FirebaseUI

[FirebaseUI](https://github.com/firebase/firebaseui-web) provides a drop-in responsive authentication flow based on Firebase Authentication, allowing your app to integrate a sophisticated and secure sign-in flow with low effort. FirebaseUI automatically adapts to the screen size of a user's devices and follows best practices for auth flows.

FirebaseUI supports multiple sign-in providers. Visit the [documentation in GitHub](<(https://github.com/firebase/firebaseui-web)>) to learn more about the various configuration options offered by FirebaseUI.

### Authentication Hook

1. Import the Authentication Hook
    ```javascript
    import { useAuth } from "@netsoft/firebase";
    ```
2. In your component, access the auth object through the hook.

    The `useAuth()` hook give's you access to several properties:

    ```javascript
    // Access the user metadata, the error information (if any), the state and the locale (language)
    const { user, isBusy, error, locale } = useAuth();
    ```

    The default language is inferred by the browser language, but if necessary, it is possible to set a custom language:

    ```javascript
    const { locale } = useAuth({ locale: "pt-PT" });
    ```

    > The locale is then injected into all providers that support localization.

    The available methods allow you to access the various signIn mechanisms:

    ```javascript
    // Access and use the `signInAnonymously` and the `signInWithEmailAndPassword` methods
    const { signInAnonymously, signInWithEmailAndPassword } = useAuth();
    signInAnonymously();
    signInWithEmailAndPassword(email, password);
    ```

    ```javascript
    // Access and use the Google SignIn methods
    const { signInWithGoogle } = useAuth();
    signInWithGoogle();
    // optionally you can also indicate a list of scopes and other options:
    const scopes = ["https://www.googleapis.com/auth/contacts.readonly"];
    signInWithGoogle(scopes);
    signInWithGoogle(scopes, { popup: true });
    ```

    ```javascript
    // Access and use the Facebook SignIn methods
    const { signInWithFacebook } = useAuth();
    signInWithFacebook();
    // optionally you can also indicate a list of scopes and other options:
    const scopes = ["user_birthday"];
    signInWithFacebook(scopes);
    signInWithFacebook(scopes, { popup: true });
    ```

    ```javascript
    // Access and use the Twitter SignIn methods
    const { signInWithTwitter } = useAuth();
    signInWithTwitter();
    signInWithTwitter(null, { popup: true });
    ```

    ```javascript
    // Access and use the GitHub SignIn methods
    const { signInWithGitHub } = useAuth();
    signInWithGitHub();
    const scopes = ["repo"];
    signInWithGitHub(scopes);
    signInWithGitHub(scopes, { popup: true });
    ```

    ```javascript
    // Access and use the Microsoft SignIn methods
    const { signInWithMicrosoft } = useAuth();
    signInWithMicrosoft();
    // optionally you can also indicate a list of scopes and other options:
    const scopes = ["mail.read", "calendars.read"];
    signInWithFacebook(scopes);
    signInWithFacebook(scopes, {
        popup: true,
        // Target specific email with login hint.
        login_hint: "user@firstadd.onmicrosoft.com",
        // Optional "tenant" parameter in case you are using an Azure AD tenant.
        tenant: "TENANT_ID",
    });
    ```

    ```javascript
    // Access and use the Apple SignIn methods
    const { signInWithApple } = useAuth();
    signInWithApple();
    // optionally you can also indicate a list of scopes and other options:
    const scopes = ["email", "name"];
    signInWithApple(scopes);
    signInWithApple(scopes, { popup: true });
    ```

    ```javascript
    // Access and use the Yahoo SignIn methods
    const { signInWithYahoo } = useAuth();
    signInWithYahoo();
    // optionally you can also indicate a list of scopes and other options:
    const scopes = ["mail-r", "sdct-w"];
    signInWithYahoo(scopes);
    signInWithYahoo(scopes, {
        popup: true,
        // Prompt user to re-authenticate to Yahoo.
        prompt: "login",
    });
    ```

3. SignOut

    ```JavaScript
    const { signOut } = useAuth();
    signOut();
    ```

## Cloud Firestore

Cloud Firestore is a flexible, scalable database for mobile, web, and server development from Firebase and Google Cloud. It keeps your data in sync across client apps through realtime listeners and offers offline support for mobile and web so you can build responsive apps that work regardless of network latency or Internet connectivity. Cloud Firestore also offers seamless integration with other Firebase and Google Cloud products, including Cloud Functions.

1. Import the Document or the Collection Hooks
    ```javascript
    import { useDocument, useCollection } from "@netsoft/firebase";
    ```

### Fetch a colletion of documents

1. To fetch a collection of document, just use the `useCollection` hook:
    ```javascript
    const [data, isBusy, err] = useCollection("<collectionPath>");
    ```
2. If you need your collection to be automaticaly updated when data changes in the backend, you can pass an optional options parameter with `snapshot: true`:
    ```javascript
    const [data, isBusy, err] = useCollection("<collectionPath>", {
        snapshot: true,
    });
    ```
3. If you want to filter your data, the fill the `filter` property in the options parameter:
    ```javascript
    const [data, isBusy, err] = useCollection("<collectionPath>", {
        filter: ["Age", ">=", 18],
    });
    ```
    the filter row must contain always three items: "FieldName"; "Operator"; "Value"
4. The `filter` property can also be an array of rows, if you need more than one criteria:
    ```javascript
    const [data, isBusy, err] = useCollection("<collectionPath>", {
        filter: [
            ["Age", ">=", 18],
            ["State", "==", "CA"],
        ],
    });
    ```

### Fetch a single document

1. To fetch a specific document, just use the `useDocument` hook:

    ```javascript
    const [data, isBusy, err] = useDocument("<collectionPath>", "<documentId>");
    ```

2. If you need your data to be automaticaly updated when data changes in the backend, you can pass an optional options parameter with `snapshot: true`:
    ```javascript
    const [data, isBusy, err] = useDocument(
        "<collectionPath>",
        "<documentId>",
        {
            snapshot: true,
        }
    );
    ```

### Actions

If you need to interact with your data (add; update; remove), just add an extra field to the hook:

```javascript
const [data, isBusy, err, actions] = useCollection("<...>");
actions.create("<...>");

const [data, isBusy, err, actions] = useDocument("<...>");
actions.update("<...>");
actions.delete();
```

**More Instructions will come soon, stay tuned...**

## Storage

Cloud Storage for Firebase is built for app developers who need to store and serve user-generated content, such as photos or videos.

Cloud Storage for Firebase is a powerful, simple, and cost-effective object storage service built for Google scale. The Firebase SDKs for Cloud Storage add Google security to file uploads and downloads for your Firebase apps, regardless of network quality.
You can use the SDKs to store images, audio, video, or other user-generated content. On the server, you can use Google Cloud Storage APIs to access the same files.

**Instructions will come soon, stay tuned...**

# MIT License

![NPM](https://img.shields.io/npm/l/@netsoft/firebase?style=social)

Copyright (c) 2010-2021, Netsoft® (Portugal) mail@netsoft.pt

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
