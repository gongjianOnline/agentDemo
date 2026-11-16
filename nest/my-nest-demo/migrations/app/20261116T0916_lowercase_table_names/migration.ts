#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/366a2694b6ee4aa28c995a4608f4bef9bd64b90dbe530b8cdd060be7b756c047/contract';
import endContract from '../../snapshots/366a2694b6ee4aa28c995a4608f4bef9bd64b90dbe530b8cdd060be7b756c047/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/920a87b50729a867e21706dd0fa5c3739e273a84ed89eb2f3525633b2d6ef85c/contract';
import startContract from '../../snapshots/920a87b50729a867e21706dd0fa5c3739e273a84ed89eb2f3525633b2d6ef85c/contract.json' with { type: 'json' };
import { Migration, MigrationCLI } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      ...this.renameTable({ schema: 'public', table: 'User', to: 'user' }),
      ...this.renameTable({ schema: 'public', table: 'Post', to: 'post' }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
