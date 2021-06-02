import React from "react";
// import SweetAlert from "react-bootstrap-sweetalert";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import moment from "moment";
import {
  getEarningMaster,
  addEarningMaster,
  getEarningMasterDropDown,
} from "../../../../redux/actions/HR/EarningMaster";

import {
  Card,
  CardBody,
  FormGroup,
  Form,
  Col,
  Button,
  Input,
  Label,
  CardHeader,
  CardTitle,
  CustomInput,
} from "reactstrap";
import "../../../../assets/scss/pages/data-list.scss";
import { history } from "../../../../history";
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";
import ErrorText from "../../../ui-elements/text-utilities/ErrorText";


class EarningMasterNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      successMsg: "",
         response: [],
  
    };
  }

  componentDidMount() {
    var postData = {
      SearchText: "",
      PageNo: 1,
    };
    this.props.getEarningMasterDropDown(postData);
    this.props.getEarningMaster(postData);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.earningMaster.error !== this.props.earningMaster.error &&
      this.props.earningMaster.error
    ) {
      toast.error(this.props.earningMaster.error);
    }
    if (
      prevProps.earningMaster.successMsg !== this.props.earningMaster.successMsg &&
      this.props.earningMaster.successMsg
    ) {
      toast.success(this.props.earningMaster.successMsg);
    }

    if (prevProps.earningMaster.data !== this.props.earningMaster.data) {
      this.setState({
        response:
          this.props.earningMaster.data && this.props.earningMaster.data.length
            ? this.props.earningMaster.data
            : [],
            random: this.props.earningMaster.random,
      });
    }

    if (
      prevProps.earningMaster.data !== this.props.earningMaster.data &&
      history?.location?.state?.id
    ) {
      const id = history?.location?.state?.id;  
      const filterData =
        this.props.earningMaster.data &&
        this.props.earningMaster.data.filter((data) => {
          return data.IDNumber === id;
        })?.[0];
      this.setState({ itemData: filterData });
      this.setState({
        parentIDNumber: filterData?.IDNumber,
        IndentNo: filterData?.IndentNo,
        EarningCode: filterData?.EarningCode,
        EarningName: filterData?.EarningName,
         });
    }
  }

  onChange = (event, name) => {
    this.setState({ [name]: event.target.value });
  };

 
   refreshPage=(e)=> {
    window.location.reload(false);
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({
      btnFlg: true,
    });
    const {
      EarningCode,
      EarningName,
      itemData,
      IndentNo,
    } = this.state;

    if (
      EarningCode &&
      EarningName 
    
     
    ) {
      let postData = {
        IDNumber: history?.location?.state?.id
          ? history?.location?.state?.id
          : 0,
          IndentNo: IndentNo ? IndentNo : "",
        EarningCode,
        EarningName,
           Year_ID:
          localStorage.getItem("yearId") && localStorage.getItem("yearId"),
        CreatedDate: history?.location?.state?.id
          ? itemData?.CreatedDate
          : moment(),
        CreatedBy:
          localStorage.getItem("userData") &&
          JSON.parse(localStorage.getItem("userData")).IDNumber,
        UpdatedBy:
          localStorage.getItem("userData") &&
          JSON.parse(localStorage.getItem("userData")).IDNumber,
        UpdatedDate: moment(),
      };

      if (history?.location?.state?.id) {
        await this.props.addEarningMaster({
          ...itemData,
          ...postData,
        });
      } else {
        await this.props.addEarningMaster(postData);
      }
      await this.resetState();
      await history.push("/pages/profile");
    }
  };

  resetState = () => {
    this.setState({
      btnFlg: false,
    });
  };
  toggleModal = () =>
  this.setState({
    modal: !this.state.modal,
  });


  render() {
    const { btnFlg,  Reason } = this.state;
    return (
      <React.Fragment>
        <Card>
          <CardHeader>
     
        
          </CardHeader>
          <CardBody className="p-0">
            <Form className="pr-2 pl-2">
              <FormGroup row>
                <Col>
                
                  <Input
                    // bsSize="sm"
                    type="text"
                    value={this.state.EarningCode ? this.state.EarningCode : ""}
                    onChange={(e) =>
                      this.setState({ EarningCode: e.target.value })
                    }
                    name="EarningCode"
                    id="EarningCode"
                    placeholder=""
                    className={`form-control form-control-sm ${
                      btnFlg && !this.state?.EarningCode ? "invalid-input" : ""
                    }`}
                  />
                  {btnFlg && !this.state?.EarningCode && <ErrorText />}
                </Col>

                
                <Col>
              
                  <Input
                    bsSize="sm"
                    type="text"
                    value={
                      this.state.EarningName
                        ? this.state.EarningName
                        : ""
                    }
                    className={`form-control form-control-sm ${
                      btnFlg && !this.state?.EarningName
                        ? "invalid-input"
                        : ""
                    }`}
                    onChange={(e) =>
                      this.setState({ EarningName: e.target.value })
                    }
                    name="EarningName"
                    id="EarningName"
                    placeholder=""
                  />
                  {btnFlg && !this.state?.EarningName && <ErrorText />}
                </Col>
              </FormGroup>
           
            
              <fieldset className="form-label-group mb-50">
              <Input
                type="textarea"
                rows="3"
                placeholder="Add Comment"
                id="add-comment"
              />
              <Label for="add-comment">Add Comment</Label>
            </fieldset>
            <Button.Ripple size="sm" color="primary" >
              
              Post Comment
            </Button.Ripple>
          

             
            </Form>
            <ToastContainer />
          </CardBody>
        </Card>
      </React.Fragment>
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
  getEarningMasterDropDown,
  addEarningMaster,

})(EarningMasterNew);
