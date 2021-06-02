import React from "react";
import {
  NavItem,
  UncontrolledTooltip,
  NavLink,
  UncontrolledDropdown,
  // Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  // Media,
  // Badge,
} from "reactstrap";
// import PerfectScrollbar from "react-perfect-scrollbar";
import axios from "axios";
import * as Icon from "react-feather";
//import classnames from "classnames"
//import ReactCountryFlag from "react-country-flag"
//import Autocomplete from "../../../components/@vuexy/autoComplete/AutoCompleteComponent"
import { history } from "../../../history";
//import { IntlContext } from "../../../utility/context/Internationalization"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { connect } from "react-redux";

const handleNavigation = (e, path) => {
  e.preventDefault();
  history.push(path);
};

const UserDropdown = (props) => {
  //const { logout, isAuthenticated } = useAuth0()
  return (
    <DropdownMenu right>
      <DropdownItem
        tag="a"
        href="#"
        onClick={(e) => handleNavigation(e, "/pages/profile")}
      >
        <Icon.User size={14} className="mr-50" />
        <span className="align-middle">Edit Profile</span>
      </DropdownItem>
      <DropdownItem
        tag="a"
        href="/login"
        onClick={(e) => {
          e.preventDefault();
          return props.logoutWithJWT();
        }}
      >
        <Icon.Power size={14} className="mr-50" />
        <span className="align-middle">Log Out</span>
      </DropdownItem>
    </DropdownMenu>
  );
};

class NavbarUser extends React.PureComponent {
  state = {
    navbarSearch: false,
    langDropdown: false,
    suggestions: [],
    starredItems: [],
  };

  componentDidMount() {
    axios.get("/api/main-search/data").then(({ data }) => {
      this.setState({ suggestions: data.searchResult });
    });

    
  }

  

  handleNavbarSearch = () => {
    this.setState({
      navbarSearch: !this.state.navbarSearch,
    });
  };

  removeItem = (id) => {
    let cart = this.state.shoppingCart;

    let updatedCart = cart.filter((i) => i.id !== id);

    this.setState({
      shoppingCart: updatedCart,
    });
  };

  handleLangDropdown = () =>
    this.setState({ langDropdown: !this.state.langDropdown });

  renderBookmarks = () => {
    this.updateBookmarks = true;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="d-flex flex-sm-wrap flex-lg-nowrap draggable-cards"
            >
              {this.state.starredItems.map((item, index) => {
                const IconTag = Icon[item.icon ? item.icon : "X"];
                return (
                  <Draggable
                    key={item.target}
                    draggableId={item.target}
                    index={index}
                  >
                    {(provided, snapshot) => {
                      return (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <NavItem className="nav-item d-none d-lg-block">
                            <NavLink
                              tag="span"
                              id={item.target}
                              className="nav-link cursor-pointer"
                              onClick={() => history.push(item.link)}
                            >
                              <IconTag size={21} />
                            </NavLink>
                            <UncontrolledTooltip
                              placement="bottom"
                              target={item.target}
                            >
                              {item.title}
                            </UncontrolledTooltip>
                          </NavItem>
                        </div>
                      );
                    }}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  };

  render() {
    return (
      <ul className="nav navbar-nav navbar-nav-user float-right">
      

        <UncontrolledDropdown className="dropdown-user nav-item">
          <DropdownToggle tag="a" className="nav-link dropdown-user-link">
            <div style={{ display: "inline" }}>
              <span data-tour="user">
                <span className="user-name text-bold-600 text-light">
                  {this.props.userName}
                </span>
                <img
                  style={{ marginLeft: "10px" }}
                  src={this.props.userImg}
                  className="round"
                  height="40"
                  width="40"
                  alt="avatar"
                />
              </span>
            </div>
          </DropdownToggle>
          <UserDropdown {...this.props} />
        </UncontrolledDropdown>
      </ul>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    bookmarks: state.navbar,
  };
};

export default connect(mapStateToProps)(NavbarUser);
