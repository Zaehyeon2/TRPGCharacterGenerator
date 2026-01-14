import { Container, Grid, Stack, Text } from '@mantine/core';
import React from 'react';

interface CreditInfo {
  spendingLevel: string;
  cash: string;
  assets: string;
}

interface ExplorerCreditProps {
  creditInfo: CreditInfo;
}

export const ExplorerCredit = React.memo(function ExplorerCredit({
  creditInfo,
}: ExplorerCreditProps) {
  return (
    <Stack
      justify="space-between"
      spacing="xs"
      sx={{ paddingBottom: '10px', border: 'solid', marginTop: '16px' }}
    >
      <Text sx={{ backgroundColor: 'gold', color: 'black' }}>현금과 자산</Text>
      <Grid justify="center" align="center" columns={1}>
        <Grid.Col span={1}>
          <Container>
            <Stack
              sx={{
                border: '1px solid',
                borderRadius: '0.5em',
                paddingTop: '11.15px',
                paddingBottom: '11.25px',
              }}
              justify="center"
              spacing={0}
            >
              <Text fz="sm">소비 수준</Text>
              <Text>${creditInfo.spendingLevel}</Text>
            </Stack>
          </Container>
        </Grid.Col>
        <Grid.Col span={1}>
          <Container>
            <Stack
              sx={{
                border: '1px solid',
                borderRadius: '0.5em',
                paddingTop: '11.15px',
                paddingBottom: '11.25px',
              }}
              justify="center"
              spacing={0}
            >
              <Text fz="sm">현금</Text>
              <Text>${creditInfo.cash}</Text>
            </Stack>
          </Container>
        </Grid.Col>
        <Grid.Col span={1}>
          <Container>
            <Stack
              sx={{
                border: '1px solid',
                borderRadius: '0.5em',
                paddingTop: '11.15px',
                paddingBottom: '11.25px',
              }}
              justify="center"
              spacing={0}
            >
              <Text fz="sm">자산</Text>
              <Text>${creditInfo.assets}</Text>
            </Stack>
          </Container>
        </Grid.Col>
      </Grid>
    </Stack>
  );
});
