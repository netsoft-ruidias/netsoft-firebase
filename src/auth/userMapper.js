export const userMapper = {
    Map: (user) => {
        return user
            ? {
                  isSignedIn: true,
                  uid: user.uid,
                  profile: {
                      displayName:
                          user.displayName ??
                          (user.isAnonymous ? "[Anonymous]" : ""),
                      email: user.email,
                      phoneNumber: user.phoneNumber,
                      photoURL: user.photoURL,
                  },
                  emailVerified: user.emailVerified,
                  lastSignIn: user.metadata?.lastSignInTime,
                  locale: user.auth.languageCode,
                  isAnonymous: user.isAnonymous,
                  credential: {
                      accessToken: user.stsTokenManager?.accessToken,
                      refreshToken: user.stsTokenManager?.refreshToken,
                  },
                  providers: user.providerData.map((x) => {
                      return {
                          providerId: x.providerId,
                          uid: x.uid,
                          displayName: x.displayName,
                          email: x.email,
                          photoURL: x.photoURL,
                      };
                  }),
              }
            : {
                  isSignedIn: false,
              };
    },
};
