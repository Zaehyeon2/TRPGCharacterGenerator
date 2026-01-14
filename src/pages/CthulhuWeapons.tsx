import { Tabs } from '@mantine/core';
import { IconSword, IconViewfinder, IconBomb } from '@tabler/icons-react';
import React from 'react';
import { WeaponsTable } from '../components/weapons';
import {
  etcWeapons,
  machineGunWeapons,
  meleeWeapons,
  pistolWeapons,
  rifleWeapons,
  shotgunWeapons,
  submachineGunWeapons,
} from '../consts/weapons';

export function CthulhuWeapons() {
  return (
    <Tabs defaultValue="melee">
      <Tabs.List>
        <Tabs.Tab value="melee" icon={<IconSword size={14} />}>
          근거리
        </Tabs.Tab>
        <Tabs.Tab value="pistol" icon={<IconViewfinder size={14} />}>
          권총⚠
        </Tabs.Tab>
        <Tabs.Tab value="rifle" icon={<IconViewfinder size={14} />}>
          소총⚠/돌격 소총⚠
        </Tabs.Tab>
        <Tabs.Tab value="shotgun" icon={<IconViewfinder size={14} />}>
          산탄총⚠
        </Tabs.Tab>
        <Tabs.Tab value="submachinegun" icon={<IconViewfinder size={14} />}>
          기관단총
        </Tabs.Tab>
        <Tabs.Tab value="machinegun" icon={<IconViewfinder size={14} />}>
          기관총
        </Tabs.Tab>
        <Tabs.Tab value="etc" icon={<IconBomb size={14} />}>
          폭발물,중화기,기타⚠
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="melee">
        <WeaponsTable weapons={meleeWeapons} />
      </Tabs.Panel>
      <Tabs.Panel value="pistol">
        <WeaponsTable weapons={pistolWeapons} />
      </Tabs.Panel>
      <Tabs.Panel value="rifle">
        <WeaponsTable weapons={rifleWeapons} />
      </Tabs.Panel>
      <Tabs.Panel value="shotgun">
        <WeaponsTable weapons={shotgunWeapons} />
      </Tabs.Panel>
      <Tabs.Panel value="submachinegun">
        <WeaponsTable weapons={submachineGunWeapons} />
      </Tabs.Panel>
      <Tabs.Panel value="machinegun">
        <WeaponsTable weapons={machineGunWeapons} />
      </Tabs.Panel>
      <Tabs.Panel value="etc">
        <WeaponsTable weapons={etcWeapons} />
      </Tabs.Panel>
    </Tabs>
  );
}
