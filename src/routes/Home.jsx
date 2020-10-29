import axios from 'axios';
import React, { useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';
import Dropzone from 'react-dropzone';
import pdfImage from '../assets/pdf.png';
import videoImage from '../assets/youtube.png';
import mp3Image from '../assets/mp3.png';
import mp4Image from '../assets/mp4.png';
import gif from '../assets/ocr.gif';
import DocumentPreviewer from "../components/DocumentPreview";

function Home() {
    const placeHolderText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vulputate, leo in pretium lobortis, enim tortor maximus odio,` + 
    `in finibus velit nunc et enim. Curabitur laoreet erat quis ultrices vehicula. Nunc enim purus, mattis sed posuere id, tempus quis ipsum. Quisque at elit in` + 
    `felis feugiat iaculis. Nulla vehicula nec orci eu feugiat. Proin vel ornare diam. Proin imperdiet iaculis purus, ut porttitor tortor finibus vitae.\n\n\n` + 
    `Ut euismod eleifend orci, sit amet hendrerit purus ultrices sed. Donec eu nunc ut est fermentum finibus. Ut quam ipsum, ornare eget mi id, fringilla` +
    `mattis velit. Aliquam ac ligula risus. In tincidunt tellus in convallis consectetur. Ut tincidunt ante pulvinar erat condimentum elementum. Proin non vehicula ante.`;

    const [view, setView] = useState('choose');
    const [pdfFile, setPDFFile] = useState();
    const [video, setVideo] = useState();
    const pdfUploadUrl = 'https://turnthebus-tts.azurewebsites.net/pdf-to-text'
    const [pdfConvertedToText, setPdfConvertToText] = useState(placeHolderText);

    const handlePDFSubmit = (e) => {
        e.stopPropagation();
        if(pdfFile){
            setView('pdfToTextLoading');

            axios.post(pdfUploadUrl, {
                pdf: pdfFile
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    };

    const renderStepOne = () => {
        return (
            <>
                <Container>
                    <Jumbotron style={{
                        backgroundColor: 'transparent'
                    }}
                    >
                        <p>
                            Start transcribing PDF textbooks or videos by uploading the PDF containing scanned textbook pages or entering the URL for the video.
                                </p>
                    </Jumbotron>
                    <Container>
                        <Row>
                            <Col>
                                <Dropzone onDrop={acceptedFiles => {
                                    console.debug(acceptedFiles[0]);
                                    setPDFFile(acceptedFiles[0]);
                                }}
                                >
                                    {({ getRootProps, getInputProps, isDragActive }) => (
                                        <Card
                                            {...getRootProps()}
                                            border={isDragActive ? "primary" : ""}
                                            style={{
                                                width: '18rem',
                                                borderWidth: isDragActive ? '2px' : '1px'
                                            }}>
                                            {isDragActive && <Badge variant="primary">Drop here</Badge>}
                                            <Card.Body>
                                                <Card.Title>Upload a book PDF</Card.Title>
                                            </Card.Body>
                                            <Card.Img
                                                variant="top"
                                                src={pdfImage}
                                                style={{
                                                    maxWidth: '100px',
                                                    alignSelf: 'center',
                                                    margin: '3em'
                                                }} />
                                            <Card.Body>
                                                Drag and drop file here or	
                                                <Button	
                                                    style={{	
                                                        paddingLeft: '0'	
                                                    }}	
                                                    variant="link"	
                                                >	
                                                    upload from your computer	
                                                </Button>	
                                                <input {...getInputProps()} />	
                                                {pdfFile?.name || ''}
                                                <Container>
                                                    <Row >
                                                        <Col />
                                                        <Col>
                                                            <Button
                                                                disabled={!pdfFile?.path}
                                                                onClick={handlePDFSubmit}
                                                                variant="success"
                                                            >
                                                                Next
                                                                    </Button>
                                                        </Col>
                                                        <Col />
                                                    </Row>
                                                </Container>
                                            </Card.Body>
                                        </Card>
                                    )}
                                </Dropzone>
                            </Col>
                            <Col style={{
                                textAlign: 'center',
                                alignSelf: 'center'
                            }}>
                                OR
                                    </Col>
                            <Col>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Body>
                                        <Card.Title>Use an English video</Card.Title>
                                    </Card.Body>
                                    <Card.Img
                                        variant="top"
                                        src={videoImage}
                                        style={{
                                            maxWidth: '100px',
                                            alignSelf: 'center',
                                            margin: '3em'
                                        }} />
                                    <Card.Body>
                                        <Form.Group controlId="videoURL">
                                            <Form.Label>Enter video file URL</Form.Label>
                                            <Form.Control 
                                                type="url" 
                                                placeholder="https://www.youtube.com/embed/YpXXV10q_CY/21s" 
                                                pattern="https://.*" 
                                                size="30" 
                                                onChange={(event) => {setVideo(event.target.value);}}
                                                required 
                                            />
                                        </Form.Group>
                                        <Container>
                                            <Row >
                                                <Col />
                                                <Col>
                                                    <Button onClick={(e) => {
                                                        e.stopPropagation();
                                                        setView('editVideo');
                                                    }} variant="success">Next</Button>
                                                </Col>
                                                <Col />
                                            </Row>
                                        </Container>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </Container>
            </>
        );
    }

    const renderTextbookEditor = () => {
        const updateText = (e) => {
            const updatedText = e.target.value;
            setPdfConvertToText(updatedText);
        }

        return (<>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100vw',
                height: '100%'
            }}>
                <div style={{
                    flexGrow: '1'
                }}>

                    <DocumentPreviewer document={pdfFile} />
                </div>
                <div style={{
                    flexGrow: '1'
                }}>
                    <textarea
                        style={{
                            width: '100%',
                            height: '100%',
                            padding: '2em'
                        }}
                        value={pdfConvertedToText}
                        onChange={updateText}
                    ></textarea>
                </div>
            </div>
        </>);
    }

    const renderVideoTranscriptEditor = () => {
        return (<>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100vw',
                height: '100%'
            }}>
                <div style={{
                    flexGrow: '1'
                }}>
                    <iframe 
                        title='video'
                        width="100%"
                        height="80%" 
                        src={video || 'https://www.youtube.com/embed/YpXXV10q_CY/21s'}>
                    </iframe>
                </div>
                <div style={{
                    flexGrow: '1'
                }}>
                    <textarea
                        style={{
                            width: '100%',
                            height: '87%',
                            padding: '2em'
                        }}
                        defaultValue={`
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vulputate, leo in pretium lobortis, enim tortor maximus odio, in finibus velit nunc et enim. Curabitur laoreet erat quis ultrices vehicula. Nunc enim purus, mattis sed posuere id, tempus quis ipsum. Quisque at elit in felis feugiat iaculis. Nulla vehicula nec orci eu feugiat. Proin vel ornare diam. Proin imperdiet iaculis purus, ut porttitor tortor finibus vitae. Ut euismod eleifend orci, sit amet hendrerit purus ultrices sed. Donec eu nunc ut est fermentum finibus. Ut quam ipsum, ornare eget mi id, fringilla mattis velit. Aliquam ac ligula risus. In tincidunt tellus in convallis consectetur. Ut tincidunt ante pulvinar erat condimentum elementum. Proin non vehicula ante.

Donec elementum vehicula leo, id elementum mauris blandit vel. Ut scelerisque ut dolor quis auctor. Donec ultrices, mi ac pellentesque tincidunt, libero mi molestie ante, vel interdum mauris neque vel nisi. Vestibulum at tincidunt ex. Aenean pharetra pretium posuere. Duis fermentum arcu magna, nec pulvinar enim blandit consectetur. Praesent cursus aliquet ligula ut congue. Nullam nec diam ac ligula malesuada condimentum. Proin aliquam varius eleifend.

Integer id ullamcorper urna, efficitur gravida nulla. Aenean vel dictum libero. Aenean non consequat sem. Nullam vestibulum metus urna, dignissim ornare mi condimentum vitae. Suspendisse in maximus dui. Vestibulum nulla leo, pharetra a ante vitae, sodales pellentesque dolor. Nullam lacinia tellus sodales eros bibendum ornare. Curabitur eu dolor aliquet, tincidunt ipsum at, eleifend velit. Fusce at ante vitae tortor fringilla mattis eu nec leo. Mauris a sem eu nunc varius convallis fermentum ac nunc. Fusce neque lacus, varius ut auctor a, pellentesque at lacus. Praesent eleifend condimentum turpis, ut imperdiet tortor auctor nec. 
                        `}
                    ></textarea>
                    <div  
                        style={{
                            display: 'flex',
                            justifyContent: 'center'
                        }}>
                        <Button variant="primary" onClick={(e) => {}}>Translate</Button>
                    </div>
                    
                </div>
                <div style={{
                    flexGrow: '1'
                }}>
                    <textarea
                        style={{
                            width: '100%',
                            height: '87%',
                            padding: '2em'
                        }}
                        defaultValue={``}
                    ></textarea>
                </div>
            </div>
        </>);
    }

    const renderEditorView = () => {
        return (
            <>
                <Container>
                    <Row>
                        <Col md={{ span: 12, offset: 0 }}>
                            <div style={{
                                backgroundColor: 'transparent',
                                padding: '1rem'
                            }}
                            >
                                <h1 style={{
                                    textAlign: 'center'
                                }}>
                                    {view === 'editTextbook' ? 'Edit textbook content' : 'Edit video transcript and translation'}
                                </h1>
                            </div>
                        </Col>
                    </Row>
                </Container>
                {view === 'editTextbook' ? renderTextbookEditor() : renderVideoTranscriptEditor()}
                <Container style={{
                    padding: '1em 0'
                }} >
                    <Row>
                        <Col></Col>
                        <Col>
                            <ButtonGroup aria-label="Basic example" style={{
                                display: 'flex',
                                justifyContent: 'center'
                            }}>
                                <Button variant="outline-primary" onClick={(e) => {
                                    setView('choose');
                                }}>Previous</Button>
                                <Button variant="outline-primary" onClick={(e) => {
                                    setView(view === 'editTextbook' ? 'downloadNarration' : 'downloadTranslation');
                                }}>Next</Button>
                            </ButtonGroup>
                        </Col>
                        <Col></Col>
                    </Row>
                </Container>
            </>
        );
    }

    const renderNarrationDownload = () => {
        return (
            <Container>
                <Row>
                    <Col md={{ span: 10, offset: 1 }}>
                        <Container>
                            <Row>
                                <Col>
                                    <Card>
                                        <Card.Body>
                                            <Container>
                                                <Row >
                                                    <Col />
                                                    <Col md='6' className='justify-content-center d-flex flex-column'>
                                                        <Card.Img
                                                            variant="top"
                                                            src={mp3Image}
                                                            style={{
                                                                maxWidth: '100px',
                                                                alignSelf: 'center',
                                                                margin: '3em'
                                                            }} />
                                                        <Button variant="link"> Download MP3 </Button>
                                                    </Col>
                                                    <Col />
                                                </Row>
                                            </Container>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col>
                                    <Card>
                                        <Card.Body>
                                            <Container>
                                                <Row >
                                                    <Col />
                                                    <Col md='6' className='justify-content-center d-flex flex-column'>
                                                        <Card.Img
                                                            variant="top"
                                                            src={mp4Image}
                                                            style={{
                                                                maxWidth: '100px',
                                                                alignSelf: 'center',
                                                                margin: '3em'
                                                            }} />
                                                        <Button variant="link"> Download MP4 </Button>
                                                    </Col>
                                                    <Col />
                                                </Row>
                                            </Container>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
        );
    }

    const renderTranslatedVideoDownload = () => {
        return (
            <Container>
                <Row>
                    <Col md={{ span: 10, offset: 1 }}>
                        <Container>
                            <Row>
                                <Col>
                                    <Card>
                                        <Card.Body>
                                            <Container>
                                                <Row >
                                                    <div style={{
                                                        flexGrow: '1'
                                                    }}>
                                                        <iframe 
                                                            title='video'
                                                            width="100%"
                                                            height="100%" 
                                                            src={video || 'https://www.youtube.com/embed/YpXXV10q_CY/21s'}>
                                                        </iframe>
                                                    </div>
                                                    <Col />
                                                    <Col md='6' className='justify-content-center d-flex flex-column'>
                                                        <Card.Img
                                                            variant="top"
                                                            src={mp4Image}
                                                            style={{
                                                                maxWidth: '100px',
                                                                alignSelf: 'center',
                                                                margin: '3em'
                                                            }} />
                                                        <Button variant="link"> Download MP4 </Button>
                                                    </Col>
                                                    <Col />
                                                </Row>
                                            </Container>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
        );
    }

    const renderDowloadView = () => {
        return (
            <>
                <Container>
                    <Row>
                        <Col md={{ span: 12, offset: 0 }}>
                            <div style={{
                                backgroundColor: 'transparent',
                                padding: '1rem'
                            }}
                            >
                                <h1 style={{
                                    textAlign: 'center'
                                }}>
                                    {view === 'downloadNarration' ? 'Download full narration' : 'Review and download translated video'}
                                </h1>
                            </div>
                        </Col>
                    </Row>
                </Container>
                {view === 'downloadNarration' ? renderNarrationDownload() : renderTranslatedVideoDownload()}
                <Container style={{
                    padding: '1em 0',
                }} >
                    <Row>
                        <Col></Col>
                        <Col>
                            <ButtonGroup aria-label="Basic example" style={{
                                display: 'flex',
                                justifyContent: 'center'
                            }}>
                                <Button variant="outline-primary" onClick={(e) => {
                                    setView('downloadNarration' ? 'editTextbook' : 'editVideo');
                                }}>Previous</Button>
                                <Button variant="outline-primary" onClick={(e) => {
                                    setView('choose');
                                }}>Start Over</Button>
                            </ButtonGroup>
                        </Col>
                        <Col></Col>
                    </Row>
                </Container>
            </>
        );
    }

    const renderOCRLoading = () => {
        setTimeout(() => {
            setView('editTextbook');
        }, 5000);
        return (
            <>
                <Container>
                    <img
                        alt="Converting PDF to text"
                        src={gif}
                        style={{
                            margin: 'auto',
                            display: 'block'
                        }} />
                    <div
                        style={{
                            textAlign: 'center'
                        }} >
                        Converting PDF to text
                    </div>
                </Container>
            </>
        );
    }

    return (
        <>
            {view === 'choose' && renderStepOne()}
            {(view === 'pdfToTextLoading') && renderOCRLoading()}
            {(view === 'editTextbook' || view === 'editVideo') && renderEditorView()}
            {(view === 'downloadNarration' || view === 'downloadTranslation') && renderDowloadView()}
        </>
    )
}

export default Home;
