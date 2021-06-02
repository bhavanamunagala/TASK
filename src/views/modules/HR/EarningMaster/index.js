import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import SweetAlert from "react-bootstrap-sweetalert";
import { toast, ToastContainer } from "react-toastify";
import "../../../../assets/scss/plugins/extensions/toastr.scss";
import { Button, Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import { Edit, Trash, Plus } from "react-feather";
import { history } from "../../../../history";
import DataTable from "react-data-table-component";
import { CustomHeader } from "../../../components/CustomHeader";

import {
  getEarningMaster,
  deleteEarningMaster,
} from "../../../../redux/actions/HR/EarningMaster";
import { hasRight } from "../../../../constant/commonDS";

class EarningMaster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    earningList: [],
    
       deleteAlert: false,
    };
  }

  componentDidMount() {
    var postData = {
      SearchText: "",
      PageNo: 1,
    };
    this.props.getEarningMaster(postData);
  }

  static getDerivedStateFromProps(nextProps, state) {
    if (
      nextProps.earningMaster.error &&
      nextProps.earningMaster.error !== state.error
    ) {
      toast.error(nextProps.earningMaster.error);
      return {
        error: nextProps.earningMaster.error,
      };
    }
    if (nextProps.earningMaster && nextProps.earningMaster.data) {
      let successMsg = "";
      if (
        Object.keys(nextProps.earningMaster.data).every(
          (p) => nextProps.earningMaster.data[p] !== state.earningList[p]
        )
      ) {
        if (
          nextProps.earningMaster.random !== state.random &&
          nextProps.earningMaster.successMsg
        ) {
          successMsg = nextProps.earningMaster.successMsg;
          toast.success(successMsg);
        }
        return {
          earningList:
            nextProps.earningMaster.data && nextProps.earningMaster.data.length
              ? nextProps.earningMaster.data
              : [],
          successMsg: successMsg,
          random: nextProps.earningMaster.random,
        };
      }
    }
    // Return null if the state hasn't changed
    return null;
  }

  deleteRow = (row) => {
    this.setState({ deleteItem: row });
    this.setState({ deleteAlert: true });
  };
  deleteItem = () => {
    this.handleAlert();
    var postData = {
      IDNumber: this.state.deleteItem.IDNumber,
      EarningCode: this.state.deleteItem.EarningCode,
      IndentNo: this.state.deleteItem.IndentNo,
      EarningName: this.state.deleteItem.EarningName,
    };
    this.props.deleteEarningMaster(postData);
  };

  handleAlert = () => {
    this.setState({ deleteAlert: false });
  };

  searchData = (event) => {
    var postData = {
      SearchText: event.target.value,
      PageNo: 1,
    };
    this.props.getEarningMaster(postData);
  };

  render() {
    let Access = hasRight("ACC_INS");
    let columns;
    if (Access.AllowUpdate || Access.AllowDelete) {
      columns = [
        {
          name: "Actions",
          selector: "actions",
          width: "7%",
          cell: (rowData) =>
            rowData && (
              <>
                {Access.AllowUpdate ? (
                  <Edit
                    className="cursor-pointer mr-1 text-warning"
                    size={20}
                    onClick={() =>
                      history.push({
                        pathname: `/pages/profile/edit/${rowData.IDNumber}`,
                        state: {
                          id: rowData.IDNumber,
                        },
                      })
                    }
                  />
                ) : (
                  ""
                )}
                {Access.AllowDelete ? (
                  <Trash
                    className="cursor-pointer text-danger"
                    size={20}
                    onClick={() => {
                      this.deleteRow(rowData);
                    }}
                  />
                ) : (
                  ""
                )}
              </>
            ),
        },

     
        {
          name: "Earning Code",
          selector: "EarningCode",
          sortable: true,
          width: "11%",
        },
      
        {
          name: "Earning Name",
          selector: "EarningName",
          sortable: true,
        },
   
      ];
    } else {
      columns = [
           {
          name: "Earning Code",
          selector: "EarningCode",
          sortable: true,
          width: "11%",
        },
        {
          name: "Earning Name",
          selector: "EarningName",
          sortable: true,
        },
     
         ];
    }

    const { earningList, SearchText } = this.state;

    return (
      <Card>
        <CardHeader>
          <CardTitle>Earning Master</CardTitle>
          <div className="d-flex align-items-center">
            <CustomHeader value={SearchText} handleFilter={this.searchData} />
            {Access.AllowInsert ? (
              <Button
                className="ml-1"
                size="sm"
                color="primary"
                onClick={() => history.push("/pages/profile/new")}
              >
                <Plus size={20} className="text-white" />
              </Button>
            ) : (
              ""
            )}
          </div>
        </CardHeader>
        <CardBody className="p-0">
          <DataTable
            data={earningList}
            columns={columns}
            noHeader
            pagination
            paginationComponentOptions={{
              rowsPerPageText: "Records per page:",
              rangeSeparatorText: "of",
              noRowsPerPage: false,
              selectAllRowsItem: false,
              selectAllRowsItemText: "All",
            }}
          />
          <ToastContainer />
          <SweetAlert
            title="Delete Item"
            show={this.state.deleteAlert}
            showCancel
            reverseButtons
            onConfirm={() => this.deleteItem()}
            onCancel={() => this.handleAlert("deleteAlert", false)}
          >
            <p className="sweet-alert-text">
              Are you sure you want to delete this Item
            </p>
          </SweetAlert>
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    earningMaster: state.earningMaster,
  };
};

export default connect(mapStateToProps, {
  getEarningMaster,
  deleteEarningMaster,
})(EarningMaster);
