import {
  useProvider
} from 'wagmi';
import {
  Box,
  Stack,
  Text,
  Table,
  BackgroundImage,
} from '@mantine/core';
import Web3 from 'web3';
import React, { useState, useEffect } from 'react';
import { useSiteStyles } from 'src/theme';

const defaultData = [
  { claimType: 1, address1: '', address2: '', tokenId: '', rewards: '' },
  { claimType: 1, address1: '', address2: '', tokenId: '', rewards: '' },
  { claimType: 1, address1: '', address2: '', tokenId: '', rewards: '' },
  { claimType: 1, address1: '', address2: '', tokenId: '', rewards: '' },
  { claimType: 1, address1: '', address2: '', tokenId: '', rewards: '' },
  { claimType: 1, address1: '', address2: '', tokenId: '', rewards: '' },
];
const LearderBoard = ({ boardList }) => {
  const provider = useProvider();
  const [tableData, setTableData] = useState(defaultData);
  const { classes } = useSiteStyles();

  const web3 = new Web3(Web3.givenProvider || provider);

  useEffect(() => {
    if (boardList) {
      const newBoardList = boardList.sort((a, b) => {
        return (
          web3.utils.hexToNumber(b.timeStamp) -
          web3.utils.hexToNumber(a.timeStamp)
        );
      });
      let arr = defaultData;
      newBoardList.slice(0, 6).map((item, index) => {
        const data = web3.eth.abi.decodeLog(
          [
            { type: 'uint256', name: 'tokenId' },
            { type: 'uint8', name: 'tokenType' },
            { type: 'uint8', name: 'class' },
            {
              type: 'address',
              name: 'address1',
            },
            {
              type: 'address',
              name: 'address2',
            },
            {
              type: 'uint256',
              name: 'rewards',
            },
            {
              type: 'uint8',
              name: 'claimType',
            },
          ],
          item.data,
          item.topics
        );
        arr[index] = {
          claimType: Number(data.claimType),
          address1:
            data.address1.substring(0, 4) +
            '****' +
            data.address1.substring(
              data.address1.length - 4,
              data.address1.length
            ),
          address2:
            data.address2.substring(0, 4) +
            '****' +
            data.address2.substring(
              data.address2.length - 4,
              data.address2.length
            ),
          tokenId: data.tokenId,
          rewards: (Number(data.rewards) / Math.pow(10, 18)).toFixed(8),
        };
      });
      setTableData(arr);
    }
  }, [boardList]);

  return (
    <BackgroundImage src='/learderboard-bg.jpg'>
      <Stack
        align='center'
        spacing={20}
        sx={(theme) => ({
          padding: '50px 10px 60px',
        })}
      >
        <Text className={classes.heroTitle}>LEARDERBOARD</Text>
        <Box
          sx={(theme) => ({
            padding: '20px 30px',
            borderRadius: '25px',
            width: '60%',
            backgroundColor: 'rgba(0, 0, 0, 0.41)',
            [theme.fn.smallerThan('xs')]: {
              width: '100%',
            },
          })}
        >
          <Table
            horizontalSpacing='xl'
            sx={() => ({
              color: '#fbf9f9',
              fontFamily: 'Balthazar-Regular',
            })}
          >
            <thead>
              <tr>
                <th
                  style={{
                    color: '#fbf9f9',
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                  }}
                >
                  Address
                </th>
                <th
                  style={{
                    color: '#fbf9f9',
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                  }}
                >
                  NFT Number
                </th>
                <th
                  style={{
                    color: '#fbf9f9',
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    textAlign: 'center',
                  }}
                >
                  Rewards Claimed
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((element, index) => (
                <tr key={`table_item_${index}`}>
                  <td style={{ borderColor: 'rgba(255, 255, 255, 0.3)', fontSize: '16px' }}>
                    {element.claimType === 1
                      ? element.address1
                      : element.address2}
                  </td>
                  <td style={{ borderColor: 'rgba(255, 255, 255, 0.3)', fontSize: '16px' }}>
                    {element.tokenId}
                  </td>
                  <td
                    style={{
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                      fontSize: '16px',
                      textAlign: 'center',
                      height: '60px',
                    }}
                  >
                    {element.rewards}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Box>
      </Stack>
    </BackgroundImage>

  )

}
export default LearderBoard