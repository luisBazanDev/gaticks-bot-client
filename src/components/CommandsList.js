import { useContext, useEffect } from "react";
import Axios from "axios";
import AppContext from "../context/AppContext";
import Command from '../components/Command'

function CommandsList() {
  const context = useContext(AppContext);

  useEffect(() => {
    context.sendGet(`${context.apiUrl}/commands`)
    .then(response => {
      context.setCommands(response.data ? response.data : []);
    })
  })

  return <table className="table table-striped table-dark">
    <thead>
      <tr>
        <th className="col">#</th>
        <th className="col">Aliases</th>
        <th className="col">Responses</th>
        <th className="col">Action</th>
      </tr>
    </thead>
    <tbody>
      {
        context.commands.map((command, index) => {
          return <Command key={command.id} command={command} index={index} />
        })
      }
    </tbody>
  </table>
}

export default CommandsList;
