import { UserStore } from './UserStore';
import { TasksStore } from './TasksStore';
import { TaskCreateStore } from './TaskCreateStore'
import { SettingsStore } from './SettingsStore'
import { autorun } from "mobx"

class RootStore {
  public user: UserStore;
  public tasks: TasksStore;
  public taskCreate: TaskCreateStore;
  public settings: SettingsStore;
	
  constructor() {
    this.user = new UserStore(this);
    this.tasks = new TasksStore(this);
    this.taskCreate = new TaskCreateStore(this);
    this.settings = new SettingsStore(this)
  }
}

let rootStore = new RootStore()

autorun(async () => {
	if (rootStore.user.checkSession()) {
    if (typeof WavesKeeper !== 'undefined') {
      let keeperApi = await WavesKeeper.initialPromise
      if (keeperApi) {
        rootStore.user.restoreSession();
      }
      
  }
}
});

export default rootStore;
export { RootStore }