import { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import "../css/Command.css";

const Command = ({ command, index }) => {
  const context = useContext(AppContext);
  const [aliases, setAliases] = useState(command.aliases);
  const [responses, setResponses] = useState(command.resps);
  const [updates, setUpdates] = useState([]);

  const changeAliases = (index, new_value) => {
    const new_updates = [...updates];
    const update = new_updates.find((update) => update.aliases_index === index);
    if (update) {
      update.new_value = new_value;
      new_updates.splice(new_updates.indexOf(update), 1);
    }
    new_updates.push({
      aliases_index: index,
      new_value,
    });
    setUpdates(new_updates);
    enableSaveBtn();
  };

  const changeResponses = (index, new_value) => {
    const new_updates = [...updates];
    const update = new_updates.find(
      (update) => update.responses_index === index
    );
    if (update) {
      update.new_value = new_value;
      new_updates.splice(new_updates.indexOf(update), 1);
    }
    new_updates.push({
      responses_index: index,
      new_value,
    });
    setUpdates(new_updates);
    enableSaveBtn();
  };

  const enableSaveBtn = () => {
    document.getElementById("saveBtn_" + command.id).classList.remove("disabled");
  };

  const disableSaveBtn = () => {
    document.getElementById("saveBtn_" + command.id).classList.add("disabled");
  };

  const saveChanges = () => {
    if (updates.length > 0) {
      const new_command = { ...command };
      updates.forEach((update) => {
        if (update.aliases_index !== undefined) {
          new_command.aliases[update.aliases_index] = update.new_value;
        } else if (update.responses_index !== undefined) {
          new_command.resps[update.responses_index] = update.new_value;
        }
      });
      context.sendPost(`${context.apiUrl}/command/${command.id}`, new_command);
      disableSaveBtn();
    }
  };

  return (
    <tr>
      <td className="col">{index}</td>
      <td className="aliases_group">
        {aliases.map((alias, alias_index) => {
          return (
            <input
              key={command.id + "_" + alias}
              className="form-control"
              defaultValue={alias}
              onChange={(e) => changeAliases(alias_index, e.target.value)}
            ></input>
          );
        })}
        <button
          className="btn btn-primary text-center"
          onClick={() => {
            setAliases([...aliases, ""]);
          }}
        >
          + Alias
        </button>
      </td>
      <td className="responses_group">
        {responses.map((response, response_index) => {
          return (
            <input
              key={command.id + "_response_" + response_index}
              className="form-control"
              defaultValue={response}
              onChange={(e) => changeResponses(response_index, e.target.value)}
            ></input>
          );
        })}
        <button
          className="btn btn-primary text-center"
          onClick={() => {
            setResponses([...responses, ""]);
          }}
        >
          + Response
        </button>
      </td>
      <td className="actions_group">
        <button
          className="btn btn-outline-success disabled"
          onClick={saveChanges}
          id={"saveBtn_" + command.id}
        >
          Save
        </button>
        <button className="btn btn-outline-danger" onClick={(e)=>{console.log("a")}}>Delete</button>
      </td>
    </tr>
  );
};

export default Command;
