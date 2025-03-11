import React, {
  ReactNode,
  useState,
  useEffect,
  cloneElement,
  ReactElement,
} from 'react';
import Button from './Button';
import { BaseProps } from '../@types/common';
import { getCurrentUser, signInWithRedirect, signOut } from 'aws-amplify/auth';
import { useTranslation } from 'react-i18next';
import { PiCircleNotch } from 'react-icons/pi';

const MISTRAL_ENABLED: boolean = import.meta.env.VITE_APP_ENABLE_MISTRAL === 'true';

type Props = BaseProps & {
  children: ReactNode;
};

const AuthCustom: React.FC<Props> = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    getCurrentUser()
      .then(() => {
        setAuthenticated(true);
      })
      .catch(() => {
        setAuthenticated(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSignIn = () => {
    signInWithRedirect({
      provider: {
        custom: import.meta.env.VITE_APP_CUSTOM_PROVIDER_NAME,
      },
    });
  };

  const handleSignOut = () => {
    signOut();
  };

  return (
    <>
      {loading ? (
        <div className="flex flex-col items-center p-4">
          <div className="mb-3 text-4xl">Loading...</div>
          <div className="animate-spin">
            <PiCircleNotch size={100} />
          </div>
        </div>
      ) : !authenticated ? (
        <div className="flex flex-col items-center min-h-screen gap-4 content-center justify-center">
          <div style={{ maxWidth: '200px' }}>
          <img src="/images/trellis_name.png" alt="Trellis logo"/>
          </div>
          <div className="flex flex-col items-center content-center bg-white rounded-lg" >
          <div className="mb-5 mt-10 text-4xl text-aws-sea-blue-light">
            {!MISTRAL_ENABLED ? t('app.name') : t('app.nameWithoutClaude')}
          </div >
          <Button onClick={() => handleSignIn()} className="h-12 px-20 m-5 text-lg text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800">
            {t('signIn.button.login')}
          </Button>
          </div>
        </div>
      ) : (
        // Pass the signOut function to the child component
        <>{cloneElement(children as ReactElement, { signOut: handleSignOut })}</>
      )}
    </>
  );
};

export default AuthCustom;
