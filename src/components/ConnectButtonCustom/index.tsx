import { Button } from '@mantine/core';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const ConnectButtonCustom = () => {
  return (
    <ConnectButton.Custom>
      {
        ({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          authenticationStatus,
          mounted,
        }) => {
          const ready = mounted && authenticationStatus !== 'loading';
          const connected =
            ready &&
            account &&
            chain &&
            (!authenticationStatus ||
              authenticationStatus === 'authenticated');

          return (
            <div
              {...(!ready && {
                'aria-hidden': true,
                'style': {
                  opacity: 0,
                  pointerEvents: 'none',
                  userSelect: 'none',
                },
              })}
            >
              {(() => {
                if (!connected) {
                  return (
                    <Button
                      onClick={openConnectModal}
                      sx={(theme) => ({
                        background: '#F8D648',
                        boxShadow: '0px 7px 5px 0px rgba(0,0,0,0.42)',
                        border: '8px',
                        color: '#0F126D',
                        fontSize: '20px',
                        fontFamily: 'Balthazar-Regular',
                        height: '40px',
                        '&:hover': {
                          background: 'linear-gradient(#f6b03f, #f13824)',
                          color: '#fff'
                        },
                        [theme.fn.smallerThan('xs')]: {
                          fontSize: '16px',
                          height: '34px'
                        }
                      })}>
                      Connect Wallet
                    </Button>
                  );
                }

                if (chain.unsupported) {
                  return (
                    <Button onClick={openChainModal} sx={(theme) => ({
                      background: '#F8D648',
                      boxShadow: '0px 7px 5px 0px rgba(0,0,0,0.42)',
                      border: '8px',
                      color: '#0F126D',
                      fontSize: '20px',
                      fontFamily: 'Balthazar-Regular',
                      height: '40px',
                      '&:hover': {
                        background: 'linear-gradient(#f6b03f, #f13824)',
                        color: '#fff'
                      },
                      [theme.fn.smallerThan('xs')]: {
                        fontSize: '16px',
                        height: '34px'
                      }
                    })}>
                      Wrong network
                    </Button>
                  );
                }

                return (
                  <div style={{ display: 'flex' }}>
                    <Button
                      onClick={openAccountModal}
                      sx={(theme) => ({
                        background: '#F8D648',
                        boxShadow: '0px 7px 5px 0px rgba(0,0,0,0.42)',
                        border: '8px',
                        color: '#0F126D',
                        fontSize: '20px',
                        fontFamily: 'Balthazar-Regular',
                        height: '40px',
                        '&:hover': {
                          background: 'linear-gradient(#f6b03f, #f13824)',
                          color: '#fff'
                        },
                        [theme.fn.smallerThan('xs')]: {
                          fontSize: '16px',
                          height: '34px'
                        }
                      })}
                    >
                      {account.displayName}
                    </Button>
                  </div>
                );
              })()}
            </div>
          );
        }
      }
    </ConnectButton.Custom>
  )

}
export default ConnectButtonCustom