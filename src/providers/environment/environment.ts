import { Injectable } from '@angular/core';

/*
Committed to git when isDev was set to false
Then added to gitignore and changed isDev to true
 */
@Injectable()
export class Environment {
  public isDevEnvironment : boolean = false;

  constructor() {
  }
}
