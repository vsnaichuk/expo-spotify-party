import React from 'react'
import { AuthFlow } from 'react-native-doorman'
import { useRouting } from 'expo-next-react-navigation'
import { NavigationRoutes } from '../navigation/routes'
import { User } from '../api/user'
import { Platform } from 'react-native'

export default function ConfirmPhone() {
  const { getParam, navigate, goBack, popToTop } = useRouting()
  const redirectPartyId = getParam<string | undefined>('redirectPartyId')
  return (
    <AuthFlow.ConfirmScreen
      // no header on mobile: let react navigation handle that
      renderHeader={Platform.OS === 'web' ? undefined : null}
      backgroundColor="#1DB954"
      onGoBack={goBack}
      onUserSuccessfullySignedIn={async () => {
        const me = await User.get()
        console.log({ me })
        if (User.hasSpotifyAccountLinked(me)) {
          // all auth is complete
          if (redirectPartyId) {
            navigate({
              routeName: NavigationRoutes.party,
              params: {
                id: redirectPartyId,
              },
              web: {
                path: `/${NavigationRoutes.party}/${redirectPartyId}`,
              },
            })
          } else {
            popToTop()
            navigate({
              routeName: NavigationRoutes.dashboard,
            })
          }
        } else if (User.hasOnboarded(me)) {
          // has handle, but not spotify
          navigate({
            routeName: NavigationRoutes.spotifyAuth,
            params: {
              redirectPartyId,
            },
          })
        } else {
          // has no auth
          navigate({
            routeName: NavigationRoutes.onboarding,
            params: {
              redirectPartyId,
            },
          })
        }
      }}
    />
  )
}
