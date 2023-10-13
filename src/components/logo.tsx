import { Center } from '@mantine/core';
import React from 'react';

interface ILogo {
  image: string;
}

export function Logo({ image }: ILogo) {
  return (
    <Center>
      <img src={image} alt="logo" width="30%" />
    </Center>
  );
}
