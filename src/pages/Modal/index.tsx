import {
    PreviewComponent,
    Preview,
    Source,
    Highlight,
} from "../../base-components/PreviewComponent";
import {
    FormLabel,
    FormSwitch,
    FormInput,
    FormSelect,
} from "../../base-components/Form";
import {Menu, Dialog} from "../../base-components/Headless";
import Button from "../../base-components/Button";
import Lucide from "../../base-components/Lucide";
import React, {useState, useRef} from "react";

function Main() {
    const [headerFooterModalPreview, setHeaderFooterModalPreview] =
        useState(false);
    const [successModalPreview, setSuccessModalPreview] = useState(false);
    const sendButtonRef = useRef(null);
    useRef(null);
    return (
        <>
            <div className="flex items-center mt-8 intro-y">
                <h2 className="mr-auto text-lg font-medium">Modal</h2>
            </div>
            <div className="col-span-12 intro-y lg:col-span-6">
                {/* BEGIN: Header & Footer Modal */}
                <PreviewComponent className="intro-y box">
                    {({toggle}) => (
                        <>
                            <div
                                className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60 dark:border-darkmode-400">
                                <h2 className="mr-auto text-base font-medium">
                                    Header & Footer Modal
                                </h2>
                                <FormSwitch className="w-full mt-3 sm:w-auto sm:ml-auto sm:mt-0">
                                    <FormSwitch.Label htmlFor="show-example-7">
                                        Show example code
                                    </FormSwitch.Label>
                                    <FormSwitch.Input
                                        id="show-example-7"
                                        onClick={toggle}
                                        className="ml-3 mr-0"
                                        type="checkbox"
                                    />
                                </FormSwitch>
                            </div>
                            <div className="p-5">
                                <Preview>
                                    {/* BEGIN: Modal Toggle */}
                                    <div className="text-center">
                                        <Button
                                            as="a"
                                            href="#"
                                            variant="primary"
                                            onClick={(event: React.MouseEvent) => {
                                                event.preventDefault();
                                                setHeaderFooterModalPreview(true);
                                            }}
                                        >
                                            Show Modal
                                        </Button>
                                    </div>
                                    {/* END: Modal Toggle */}
                                    {/* BEGIN: Modal Content */}
                                    <Dialog
                                        open={headerFooterModalPreview}
                                        onClose={() => {
                                            setHeaderFooterModalPreview(false);
                                        }}
                                        initialFocus={sendButtonRef}
                                    >
                                        <Dialog.Panel>
                                            <Dialog.Title>
                                                <h2 className="mr-auto text-base font-medium">
                                                    Broadcast Message
                                                </h2>
                                                <Button
                                                    variant="outline-secondary"
                                                    className="hidden sm:flex"
                                                >
                                                    <Lucide icon="File" className="w-4 h-4 mr-2"/>{" "}
                                                    Download Docs
                                                </Button>
                                                <Menu className="sm:hidden">
                                                    <Menu.Button
                                                        as="a"
                                                        className="block w-5 h-5"
                                                        href="#"
                                                    >
                                                        <Lucide
                                                            icon="MoreHorizontal"
                                                            className="w-5 h-5 text-slate-500"
                                                        />
                                                    </Menu.Button>
                                                    <Menu.Items className="w-40">
                                                        <Menu.Item>
                                                            <Lucide icon="File" className="w-4 h-4 mr-2"/>
                                                            Download Docs
                                                        </Menu.Item>
                                                    </Menu.Items>
                                                </Menu>
                                            </Dialog.Title>
                                            <Dialog.Description className="grid grid-cols-12 gap-4 gap-y-3">
                                                <div className="col-span-12 sm:col-span-6">
                                                    <FormLabel htmlFor="modal-form-1">From</FormLabel>
                                                    <FormInput
                                                        id="modal-form-1"
                                                        type="text"
                                                        placeholder="example@gmail.com"
                                                    />
                                                </div>
                                                <div className="col-span-12 sm:col-span-6">
                                                    <FormLabel htmlFor="modal-form-2">To</FormLabel>
                                                    <FormInput
                                                        id="modal-form-2"
                                                        type="text"
                                                        placeholder="example@gmail.com"
                                                    />
                                                </div>
                                                <div className="col-span-12 sm:col-span-6">
                                                    <FormLabel htmlFor="modal-form-3">
                                                        Subject
                                                    </FormLabel>
                                                    <FormInput
                                                        id="modal-form-3"
                                                        type="text"
                                                        placeholder="Important Meeting"
                                                    />
                                                </div>
                                                <div className="col-span-12 sm:col-span-6">
                                                    <FormLabel htmlFor="modal-form-4">
                                                        Has the Words
                                                    </FormLabel>
                                                    <FormInput
                                                        id="modal-form-4"
                                                        type="text"
                                                        placeholder="Job, Work, Documentation"
                                                    />
                                                </div>
                                                <div className="col-span-12 sm:col-span-6">
                                                    <FormLabel htmlFor="modal-form-5">
                                                        Doesn't Have
                                                    </FormLabel>
                                                    <FormInput
                                                        id="modal-form-5"
                                                        type="text"
                                                        placeholder="Job, Work, Documentation"
                                                    />
                                                </div>
                                                <div className="col-span-12 sm:col-span-6">
                                                    <FormLabel htmlFor="modal-form-6">Size</FormLabel>
                                                    <FormSelect id="modal-form-6">
                                                        <option>10</option>
                                                        <option>25</option>
                                                        <option>35</option>
                                                        <option>50</option>
                                                    </FormSelect>
                                                </div>
                                            </Dialog.Description>
                                            <Dialog.Footer>
                                                <Button
                                                    type="button"
                                                    variant="outline-secondary"
                                                    onClick={() => {
                                                        setHeaderFooterModalPreview(false);
                                                    }}
                                                    className="w-20 mr-1"
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    variant="primary"
                                                    type="button"
                                                    className="w-20"
                                                    ref={sendButtonRef}
                                                >
                                                    Send
                                                </Button>
                                            </Dialog.Footer>
                                        </Dialog.Panel>
                                    </Dialog>
                                    {/* END: Modal Content */}
                                </Preview>
                                <Source>
                                    <Highlight>
                                        {`
                {/* BEGIN: Modal Toggle */}
                <div className="text-center">
                  <Button
                    as="a"
                    href="#"
                    variant="primary"
                    onClick={(event: React.MouseEvent) => {
                      event.preventDefault();
                      setHeaderFooterModalPreview(true);
                    }}
                  >
                    Show Modal
                  </Button>
                </div>
                {/* END: Modal Toggle */}
                {/* BEGIN: Modal Content */}
                <Dialog
                  open={headerFooterModalPreview}
                  onClose={() => {
                    setHeaderFooterModalPreview(false);
                  }}
                  initialFocus={sendButtonRef}
                >
                  <Dialog.Panel>
                    <Dialog.Title>
                      <h2 className="mr-auto text-base font-medium">
                        Broadcast Message
                      </h2>
                      <Button
                        variant="outline-secondary"
                        className="hidden sm:flex"
                      >
                        <Lucide icon="File" className="w-4 h-4 mr-2" />{" "}
                        Download Docs
                      </Button>
                      <Menu className="sm:hidden">
                        <Menu.Button className="block w-5 h-5" href="#">
                          <Lucide
                            icon="MoreHorizontal"
                            className="w-5 h-5 text-slate-500"
                          />
                        </Menu.Button>
                        <Menu.Items className="w-40">
                          <Menu.Item>
                            <Lucide icon="File" className="w-4 h-4 mr-2" />
                            Download Docs
                          </Menu.Item>
                        </Menu.Items>
                      </Menu>
                    </Dialog.Title>
                    <Dialog.Description className="grid grid-cols-12 gap-4 gap-y-3">
                      <div className="col-span-12 sm:col-span-6">
                        <FormLabel
                          htmlFor="modal-form-1"
                        >
                          From
                        </FormLabel>
                        <FormInput
                          id="modal-form-1"
                          type="text"
                          placeholder="example@gmail.com"
                        />
                      </div>
                      <div className="col-span-12 sm:col-span-6">
                        <FormLabel
                          htmlFor="modal-form-2"
                        >
                          To
                        </FormLabel>
                        <FormInput
                          id="modal-form-2"
                          type="text"
                          placeholder="example@gmail.com"
                        />
                      </div>
                      <div className="col-span-12 sm:col-span-6">
                        <FormLabel
                          htmlFor="modal-form-3"
                        >
                          Subject
                        </FormLabel>
                        <FormInput
                          id="modal-form-3"
                          type="text"
                          placeholder="Important Meeting"
                        />
                      </div>
                      <div className="col-span-12 sm:col-span-6">
                        <FormLabel
                          htmlFor="modal-form-4"
                        >
                          Has the Words
                        </FormLabel>
                        <FormInput
                          id="modal-form-4"
                          type="text"
                          placeholder="Job, Work, Documentation"
                        />
                      </div>
                      <div className="col-span-12 sm:col-span-6">
                        <FormLabel
                          htmlFor="modal-form-5"
                        >
                          Doesn't Have
                        </FormLabel>
                        <FormInput
                          id="modal-form-5"
                          type="text"
                          placeholder="Job, Work, Documentation"
                        />
                      </div>
                      <div className="col-span-12 sm:col-span-6">
                        <FormLabel
                          htmlFor="modal-form-6"
                        >
                          Size
                        </FormLabel>
                        <FormSelect
                          id="modal-form-6"
                        >
                          <option>10</option>
                          <option>25</option>
                          <option>35</option>
                          <option>50</option>
                        </FormSelect>
                      </div>
                    </Dialog.Description>
                    <Dialog.Footer>
                      <Button
                        type="button"
                        variant="outline-secondary"
                        onClick={() => {
                          setHeaderFooterModalPreview(false);
                        }}
                        className="w-20 mr-1"
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="primary"
                        type="button"
                        className="w-20"
                        ref={sendButtonRef}
                      >
                        Send
                      </Button>
                    </Dialog.Footer>
                  </Dialog.Panel>
                </Dialog>
                {/* END: Modal Content */}
                `}
                                    </Highlight>
                                </Source>
                            </div>
                        </>
                    )}
                </PreviewComponent>
                {/* END: Header & Footer Modal */}
            </div>
        </>
    );
}

export default Main;
