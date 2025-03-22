import useStore from './store';
import { colorFromName } from '../utils';

function LiveUserList() {
  const users = useStore(state => state.liveUsers);

  return (
    <div className="flex flex-wrap gap-2 justify-center text-sm mb-2">
      {users.map(name => (
        <div
          key={name}
          className="px-2 py-1 rounded-full text-white"
          style={{ backgroundColor: colorFromName(name) }}
        >
          {name}
        </div>
      ))}
    </div>
  );
}

export default LiveUserList;
