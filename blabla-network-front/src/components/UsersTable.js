import React from "react";
import { Link } from "react-router-dom";

export default function UsersTable(props) {
  return (
    <div className="user-table-wrapper">
      {props.users && props.users.length > 0 && (
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Gender</th>
              <th>City</th>
              {props.specialActions && props.specialActions.length > 0 && <th colSpan={props.specialActions.length}>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {props.users.map((user) => (
              <tr key={user.id}>
                <td key={user.id}>
                  <Link to={`/user/${user.id}`}>{user.id}</Link>
                </td>
                <td key={user.email}>{user.email}</td>
                <td key={user.firstName}>{user.firstName}</td>
                <td key={user.lastName}>{user.lastName}</td>
                <td key={user.gender}>{user.gender}</td>
                <td key={user.city}>{user.city}</td>
                {props.specialActions &&
                  props.specialActions.length > 0 &&
                  props.specialActions.map((action) => (
                    <td key={action.label}>
                      <button className="simple-button-small" onClick={() => action.action(user.id)}>
                        {action.label}
                      </button>
                    </td>
                  ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th colSpan={props.specialActions && props.specialActions.length > 0 ? 7 + props.specialActions.length : 7}>
                Total users: {props.users.length}
              </th>
            </tr>
          </tfoot>
        </table>
      )}
    </div>
  );
}
