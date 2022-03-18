import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import ModalForm from "../modal/modal";
import { withRouter } from "react-router-dom";

function SideNavList({ history, formType, list, currentUserId, addList }) {
  const handleClick = (id, type, e) => {
    e.preventDefault();
    switch (type) {
      case "list":
        history.push({
          pathname: `/lists/${id}`,
        });
        break;
      case "user":
        history.push(`/users/${id}`);
        break;
      default:
        return null;
    }
  };

  const listHeader = (formType) => {
    switch (formType) {
      case "my-lists":
        return "My Lists";
      case "following-lists":
        return "Following Lists";
      case "following-users":
        return "Following Users";
      default:
        return null;
    }
  };

  const listHeight = (formType) => {
    switch (formType) {
      case "my-lists":
        return "25vh";
      case "following-lists":
        return "39vh";
      case "following-users":
        return "25vh";
      default:
        return null;
    }
  };

  return (
    <List
      sx={{ height: listHeight(formType), overflow: "auto", paddingTop: 0 }}
    >
      <ListSubheader sx={{
        display: "flex", 
        justifyContent: "space-between",
        // backgroundColor: '#ADC178'
        backgroundColor: 'rgba(178,177,255,255)'
      }}>
        <span>{listHeader(formType)}</span>
        {formType === "my-lists" ? (
          <ModalForm currentUserId={currentUserId} addList={addList} />
        ) : null}
      </ListSubheader>
      {list.map((item) => {
        if (!item) return null;
        return (
          <ListItem
            button
            onClick={(e) =>
              handleClick(
                item.id,
                formType === "following-users" ? "user" : "list",
                e
              )
            }
            key={item.id}
          >
            <ListItemText
              primary={
                formType === "following-users"
                  ? `${item.username}`
                  : `${item.name}`
              }
              secondary={
                formType === "following-lists" ? `by ${item.ownerName}` : null
              }
            />
          </ListItem>
        );
      })}
    </List>
  );
}

export default withRouter(SideNavList);
