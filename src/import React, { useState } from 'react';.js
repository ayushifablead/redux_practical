import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addElement, updateElement, deleteElement, saveElement } from './actions';
import { Button, Form, Table, Container, Modal, Row, Col ,Nav ,Navbar ,NavDropdown} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import DataTable from 'react-data-table-component';
import { uploadImages } from './actions';
import Footer from './Footer';

function DynamicTwoInput({ data, addElement, updateElement, deleteElement, saveElement, uploadImages }) {
  const [error, setError] = useState('');
  const [tableData, setTableData] = useState([]);
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [savedItemIndex, setSavedItemIndex] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = (index) => {
    setSelectedItemIndex(index);
    setShow(true);
  };

  const addImage = (e, i) => {
    const files = e.target.files;
    const maxWidth = 500;
    const maxHeight = 375;
  
    const checkImageDimensions = (file) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = function () {
          if (this.width === maxWidth && this.height === maxHeight) {
            resolve();
          } else {
            reject(`Image dimensions must be ${maxWidth}x${maxHeight} pixels.`);
          }
        };
        img.src = URL.createObjectURL(file);
      });
    };
  
    if (files.length === 0) {
      return;
    }
  
    const fileArray = Array.from(files);
  
    Promise.all(fileArray.map(checkImageDimensions))
      .then(() => {
        const fileURLs = fileArray.map(file => URL.createObjectURL(file));
        const updatedData = [...data];
        updatedData[i].file = fileURLs;
        updateElement(i, 'file', fileURLs);
        setSelectedImages(prevImages => [...prevImages, ...fileURLs]);
        setImagePreviews(prevPreviews => [...prevPreviews, ...fileArray]);
      })
      .catch(error => {
        console.error(error);
        alert(error); 
      });
  };
  


  const handleClick = () => {
    const hasEmptyFields = data.some(val => val.fname === '' || val.pcategory === '' || val.price === '' || val.file === '');
    if (hasEmptyFields) {
      setError('Please fill in all fields before adding a new form.');
      alert("Please fill in all fields before adding a new form.");
    } else {
      addElement();
      setError('');
  
      setImages([]);
      setErrors([]);
      setSelectedImages([]);
      setImagePreviews([]);
    }
  };
  
  const handleSave = () => {
    const isEmpty = data.some(val => val.fname.trim() === '' || val.pcategory === '' || val.price.trim() === '' || val.file === '');
    if (isEmpty) {
      setErrors(data.map(val => ({
        fname: val.fname.trim() === '' ? 'Product Name is required' : '',
        pcategory: val.pcategory === '' ? 'Product Category is required' : '',
        price: val.price.trim() === '' ? 'Product Price is required' : '',
        file: val.file === '' ? 'Product Image is required' : '',
      })));
      return;
    }

    setTableData( [...data]);
    setErrors([]);
    saveElement(data);
    alert("successfully added")
  };

  
  const handleImageDelete = (index) => {
    const filteredImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(filteredImages);

    const updatedData = data.map((item, i) => {
      if (i === selectedItemIndex) {
        return { ...item, file: item.file ? item.file.filter((_, j) => j !== index) : [] };
      }
      return item;
    });

    setImagePreviews(prevPreviews => prevPreviews.filter((_, i) => i !== index));

    if (selectedItemIndex !== null) {
      const e = { target: { files: updatedData[selectedItemIndex]?.file || [] } };
      const i = selectedItemIndex;

      addImage(e, i);
      saveElement(updatedData);
    }
  };


  const handleDelete = (i) => {
    const updatedTableData = [...tableData];
    updatedTableData.splice(i, 1);
    setTableData(updatedTableData);
    deleteElement(i);
  };


  const handleChange = (e, i) => {
    const { name, value } = e.target;
    updateElement(i, name, value);

    const isEmpty = value.trim() === '';
    const updatedErrors = [...errors];
    updatedErrors[i] = isEmpty ? `${name} is required` : '';
    setErrors(updatedErrors);
  };


  const columns = [
    {
      name: 'Product Name',
      selector: row => row.fname,
    },
    {
      name: 'Product Category',
      selector: row => row.pcategory,
    },
    {
      name: 'Price',
      selector: row => row.price,
    },
    {
      name: 'Image',
      cell: row => (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {row.file && row.file.map((image, index) => (
            index === 0 && (
              <img key={index} src={image} alt={`Product ${row.id}`} style={{ width: '100px', height: '100px', marginRight: '10px', marginTop: '10px' }} />
            )
          ))}
        </div>
      ),
    },
    {
      name: 'Actions',
      cell: (row, index) => (
        <>
          <Button variant="danger" className='btn2' onClick={() => handleDelete(index)}><MdDelete className='btn3' /></Button>
          <Button variant="success" className='btn2' onClick={() => handleShow(index)}><FaEye className='btn3' /></Button>
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <>
    <Container fluid>
      <div className='header'>
    <Navbar expand="lg" className="bg-dark">
      <Container fluid>
        <Navbar.Brand href="#">Product </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#" onClick={handleClick}>Add New Product</Nav.Link>
           
          </Nav>
     
            <Button variant="success" className='btn5'>Save Draft</Button>
            <Button variant="success" className='btn5'>Publish Now</Button>
        
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
    </Container> 
    <Container>
      <Row>
        {data.map((val, i) => (
          <Col lg={4} key={i}>
            <div className='main'>
              <h1>Product Information</h1>
              <Form.Group>
                <Form.Label>Product Name</Form.Label>
                <Form.Control name="fname" value={val.fname} onChange={(e) => handleChange(e, i)} placeholder="Enter Product Name" />
                {errors[i] && <p style={{ color: 'red' }}>{errors[i].fname}</p>}
              </Form.Group>
              <Form.Group>
                <Form.Label>Product Category</Form.Label>
                <Form.Select name="pcategory" value={val.pcategory} onChange={(e) => handleChange(e, i)}>
                  <option>Select Category</option>
                  <option>Laptop</option>
                  <option>Keyboard</option>
                  <option>Mouse</option>
                </Form.Select>
                {errors[i] && <p style={{ color: 'red' }}>{errors[i].pcategory}</p>}
              </Form.Group>
              <Form.Group>
                <Form.Label>Product Price</Form.Label>
                <Form.Control type='number' name="price" value={val.price} onChange={(e) => handleChange(e, i)} placeholder='Enter Product Price' />
                {errors[i] && <p style={{ color: 'red' }}>{errors[i].price}</p>}
              </Form.Group>
              <Form.Group>
  <Form.Label>Product Image</Form.Label>
  <Form.Control type='file' name="file" multiple onChange={(e) => addImage(e, i)} />
  {/* Conditionally render image previews */}
  {selectedItemIndex === i && selectedImages.map((image, index) => (
    <div key={index} style={{ position: 'relative' }}>
      <img src={image} style={{ width: '100px', height: '100px', marginRight: '10px', marginBottom: '10px', marginTop: '20px' }} />
      <MdDelete style={{ position: 'absolute', padding: 0, marginRight: 87, color: 'white', background: 'red', fontSize: 23, top: '20px', right: 0, cursor: 'pointer' }} onClick={() => handleImageDelete(index)} />
    </div>
  ))}
  {errors[i] && <p style={{ color: 'red' }}>{errors[i].file}</p>}
</Form.Group>

              <Button  className='save' onClick={handleSave}>Save</Button>
            </div>
          </Col>
        ))}
      </Row>
      </Container>
      <Container fluid>
        <div className='data'>
          <h1>Product List</h1>
      <DataTable
       
        columns={columns}
        data={tableData}
        pagination
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5, 10, 15]} 
          noHeader
          persistTableHead
          dense
          searchable 
      />
      </div>
     </Container>
     <Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Product Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItemIndex !== null && ( 
            <div>
              <Form.Group>
                <Form.Label>Product Name</Form.Label>
                <Form.Control name="fname" value={tableData[selectedItemIndex].fname} placeholder="Enter Product Name" />

              </Form.Group>
              <Form.Group>
                <Form.Label>Product Category</Form.Label>
                <Form.Select name="pcategory" value={tableData[selectedItemIndex].pcategory} >
                  <option>Select Category</option>
                  <option>Laptop</option>
                  <option>Keyboard</option>
                  <option>Mouse</option>
                </Form.Select>

              </Form.Group>
              <Form.Group>
                <Form.Label>Product Price</Form.Label>
                <Form.Control type='number' name="price" value={tableData[selectedItemIndex].price} placeholder='Enter Product Price' />

              </Form.Group>

              <p>Product Image:</p>
              <div>
                {tableData[selectedItemIndex].file && tableData[selectedItemIndex].file.map((image, index) => (
                  <img key={index} src={image} alt={`Product ${selectedItemIndex}`} style={{ width: '100px', height: '100px', marginRight: '10px'}} />
                ))}
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

    

    </Container>

    <Container fluid>
        <Footer />
    </Container>
    </>
  );
}

const mapStateToProps = (state) => ({
  data: state.data,
});

const mapDispatchToProps = {
  addElement,
  updateElement,
  deleteElement,
  saveElement,
  uploadImages,
};

export default connect(mapStateToProps, mapDispatchToProps)(DynamicTwoInput);
