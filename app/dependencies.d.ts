import dbType from 'lib/db';
import hashType from 'lib/hash';

declare namespace dependencies {
  export type db = dbType;
  export type console = Console;
  export type hash = hashType;
}
