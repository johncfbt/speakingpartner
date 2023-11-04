import {Link} from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns';

function UserItem({ user, index }) {
  
  const lastLoginAgo = formatDistanceToNow(new Date(user.updatedAt), { addSuffix: true });

  return (
    <tr>
          <th scope="row"><Link to={`/info/${user._id}/${user.name}`}>{user.name}</Link></th>
          <td className="small-text">{lastLoginAgo}</td>
          <td className="small-text">{user.language}</td>
          <td className="small-text">{user.toggleChat?"Yes":"No"}</td>
    </tr>
  );
}

export default UserItem;
