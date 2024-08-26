import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  DatePicker,
  DatePickerInput,
  Heading,
  Modal,
  Select,
  SelectItem,
  SkeletonPlaceholder,
  Stack,
  TextArea,
  TextInput,
  TimePicker,
  Tooltip,
} from "@carbon/react";
import {
  BreakingChange,
  ChevronLeft,
  ChevronRight,
  Favorite,
  Hearing,
  ShoppingBag,
} from "@carbon/icons-react";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import TitlePanel from "@/components/TitlePanel";
import BackButton from "@/components/Button/back";
import Timeline from "../../../../components/Timeline";
import MyExpandableTile from "../../../../components/ExpandableTile";
import "./styles.scss";
import { toast, ToastContainer } from "react-toastify";
function MedicationHub({ handleBackToDashboard }) {
  const [timelines, setTimelines] = useState([]);
  useEffect(() => {
    const fetchTimelines = async () => {
      const email = "john.doe@example.com";
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/reminders/get-timeline/${encodeURIComponent(
            email
          )}`
        );
        const data = await response.json();
        setTimelines(data);
        // console.log("data", data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTimelines();
  }, []);
  const tiles = [
    {
      id: "tile-1",
      heading: "Paracetamol",
      firstUseIcon: (
        <Tooltip
          label="Helps reduce pain and fever"
          enterDelayMs={0}
          leaveDelayMs={300}
        >
          <Favorite />
        </Tooltip>
      ),
      secondUseIcon: (
        <Tooltip
          label="May aid cognitive functions"
          enterDelayMs={0}
          leaveDelayMs={300}
        >
          <Hearing />
        </Tooltip>
      ),
      thirdUseIcon: (
        <Tooltip
          label="May have cardiovascular benefits"
          enterDelayMs={0}
          leaveDelayMs={300}
        >
          <BreakingChange />
        </Tooltip>
      ),
      spoons: "2",
      afterBefore: "After",
      AmPm: "Pm",
      daysLeft: "7",
      description:
        "Paracetamol is a widely used medication known for its effectiveness in reducing pain and fever. It may also have benefits for cognitive functions and cardiovascular health.",
    },
    {
      id: "tile-2",
      heading: "Ibuprofen",
      firstUseIcon: (
        <Tooltip
          label="Helps relieve pain and inflammation"
          enterDelayMs={0}
          leaveDelayMs={300}
        >
          <Favorite />
        </Tooltip>
      ),
      secondUseIcon: (
        <Tooltip
          label="May support brain health"
          enterDelayMs={0}
          leaveDelayMs={300}
        >
          <Hearing />
        </Tooltip>
      ),
      thirdUseIcon: (
        <Tooltip
          label="May have protective effects on the heart"
          enterDelayMs={0}
          leaveDelayMs={300}
        >
          <BreakingChange />
        </Tooltip>
      ),
      spoons: "1",
      afterBefore: "Before",
      AmPm: "Am",
      daysLeft: "10",
      description:
        "Ibuprofen is commonly used to relieve pain and inflammation. It is also associated with potential benefits for brain health and cardiovascular protection.",
    },
    {
      id: "tile-5",
      heading: "Flagyl",
      firstUseIcon: (
        <Tooltip
          label="Antibiotic used to treat various infections"
          enterDelayMs={0}
          leaveDelayMs={300}
        >
          <Favorite />
        </Tooltip>
      ),
      secondUseIcon: (
        <Tooltip
          label="May have neurological effects"
          enterDelayMs={0}
          leaveDelayMs={300}
        >
          <Hearing />
        </Tooltip>
      ),
      thirdUseIcon: (
        <Tooltip
          label="May affect heart health"
          enterDelayMs={0}
          leaveDelayMs={300}
        >
          <BreakingChange />
        </Tooltip>
      ),
      spoons: "1",
      afterBefore: "Before",
      AmPm: "Am",
      daysLeft: "10",
      description:
        "Flagyl is an antibiotic used to treat various infections. It may also have effects on neurological and cardiovascular health.",
    },
    {
      id: "tile-3",
      heading: "Piriton",
      firstUseIcon: (
        <Tooltip
          label="Antihistamine used for allergy relief"
          enterDelayMs={0}
          leaveDelayMs={300}
        >
          <Favorite />
        </Tooltip>
      ),
      secondUseIcon: (
        <Tooltip
          label="May affect brain function"
          enterDelayMs={0}
          leaveDelayMs={300}
        >
          <Hearing />
        </Tooltip>
      ),
      thirdUseIcon: (
        <Tooltip
          label="May impact heart health"
          enterDelayMs={0}
          leaveDelayMs={300}
        >
          <BreakingChange />
        </Tooltip>
      ),
      spoons: "1",
      afterBefore: "Before",
      AmPm: "Am",
      daysLeft: "10",
      description:
        "Piriton is an antihistamine commonly used for allergy relief. It may also influence brain function and cardiovascular health.",
    },
    {
      id: "tile-4",
      heading: "Cetrizine",
      firstUseIcon: (
        <Tooltip
          label="Antihistamine for allergy symptoms"
          enterDelayMs={0}
          leaveDelayMs={300}
        >
          <Favorite />
        </Tooltip>
      ),
      secondUseIcon: (
        <Tooltip
          label="May support brain health"
          enterDelayMs={0}
          leaveDelayMs={300}
        >
          <Hearing />
        </Tooltip>
      ),
      thirdUseIcon: (
        <Tooltip
          label="May have cardiovascular benefits"
          enterDelayMs={0}
          leaveDelayMs={300}
        >
          <BreakingChange />
        </Tooltip>
      ),
      spoons: "1",
      afterBefore: "Before",
      AmPm: "Am",
      daysLeft: "10",
      description:
        "Cetrizine is an antihistamine used to alleviate allergy symptoms. It may also promote brain health and cardiovascular well-being.",
    },
  ];

  const pageSize = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const totalPages = Math.ceil(tiles.length / pageSize);
  const visibleTiles = tiles.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const [expandedTile, setExpandedTile] = useState(null);

  const handleExpand = (id) => {
    setExpandedTile(expandedTile === id ? null : id);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setLoading(true);
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setLoading(false);
      }, 1000);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setLoading(true);
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
        setLoading(false);
      }, 1000);
    }
  };
  const [isMobile, setMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 760) {
        setMobile(true);
      } else {
        setMobile(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const [open, setOpen] = useState(false);
  const button = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [timelineData, setTimelineData] = useState({
    description: "",
    long_description: "",
    date: "",
    patient_email: "john.doe@example.com",
    patient_name: "John Doe",
    time: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(false);
    setIsSubmitting(true);
    Swal.fire({
      title: "Adding your timeline to Medlink",
      text: "Please wait...",
      imageUrl: "/logov2.svg",
      imageWidth: 70,
      imageHeight: 70,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
        fetch("http://127.0.0.1:8000/reminders/set-timeline/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(timelineData),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            Swal.close();
            toast.success(data.message || "Timeline added successful!");
            localStorage.removeItem("TimelineData");
            // fetchTimelines();
            
          const fetchTimelines = async ()=>{
            const email = "john.doe@example.com";
            try {
              const response = await fetch(
                `http://127.0.0.1:8000/reminders/get-timeline/${encodeURIComponent(
                  email
                )}`
              );
              const data = await response.json();
              setTimelines(data);
            }catch(e){
              toast.error('There was an error', error)
            }
          }
          fetchTimelines();
            // 
          })
          .catch((error) => {
            Swal.close();
            toast.error("Adding Timeline failed. Please try again.");
            console.error("There was an error!", error);
          })
          .finally(() => {
            setIsSubmitting(false);
          });
      },
    });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;

    const newTimelineData = {
      ...timelineData,
      [id]: value,
    };

    setTimelineData(newTimelineData);
    localStorage.setItem("TimelineData", JSON.stringify(newTimelineData));
  };
  return (
    <>
      <ToastContainer />

      <Modal
        launcherButtonRef={button}
        modalHeading="Add a timeline to get a reminder"
        modalLabel="Medlink - virtual assistant"
        primaryButtonText="Set Timeline"
        secondaryButtonText="Cancel"
        open={open}
        height="auto"
        onRequestSubmit={handleSubmit}
        onRequestClose={() => setOpen(false)}
      >
        <p
          style={{
            marginBottom: "1rem",
          }}
        >
          Please fill the details below to have your timeline added to Medlink.
          Beware of the time and date you provide, to avoid collition of
          timelines. Welcome to Medlink.
        </p>
        <div style={{ width: "100%" }}>
          <div style={{ width: "100%" }}>
            <TextInput
              data-modal-primary-focus
              id="description"
              type="text"
              labelText="Timeline Name"
              placeholder="e.g Take Paracetamol 2 X 3"
              style={{
                marginBottom: "1rem",
              }}
              onChange={handleChange}
              value={timelineData.description}
            />

            <TextArea
              id="long_description"
              type="text"
              labelText="Timeline Description"
              placeholder="e.g Provide a description"
              style={{
                marginBottom: "1rem",
              }}
              onChange={handleChange}
              value={timelineData.long_description}
            />
            <Stack orientation="horizontal">
              <DatePicker
                datePickerType="single"
                dateFormat="Y-m-d"
                onChange={(dates) => {
                  const date = dates[0];
                  setTimelineData({
                    ...timelineData,
                    date: date.toISOString().split("T")[0],
                  });
                  localStorage.setItem(
                    "TimelineData",
                    JSON.stringify({
                      ...timelineData,
                      date: date.toISOString().split("T")[0],
                    })
                  );
                }}
                value={timelineData.date}
              >
                <DatePickerInput
                  id="date"
                  labelText="Date"
                  placeholder="MM/DD/YYYY"
                />
              </DatePicker>

              <TimePicker
                id="time"
                labelText="Time"
                onChange={handleChange}
                value={timelineData.time}
              />
            </Stack>
          </div>
        </div>
      </Modal>
      <motion.div
        className="medicationHub"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <TitlePanel>
          <div className="button-area">
            <BackButton onClick={handleBackToDashboard} />
            <Heading className="med-title" style={{ fontWeight: "bold" }}>
              Medication Hub
            </Heading>
          </div>
          <div className="medic-annotations">
            {isMobile ? (
              <Button
                kind="secondary"
                hasIconOnly
                ref={button}
                renderIcon={ShoppingBag}
                iconDescription="prescription"
                size="sm"
                onClick={() => setOpen(true)}
              />
            ) : (
              <Button
                kind="secondary"
                ref={button}
                size="sm"
                renderIcon={ShoppingBag}
                iconDescription="prescription"
                onClick={() => setOpen(true)}
              >
                Add a Timeline
              </Button>
            )}
            {isMobile ? (
              <Button
                hasIconOnly
                renderIcon={ShoppingBag}
                kind="tertiary"
                iconDescription="over the shelf"
                size="sm"
              />
            ) : (
              <Button
                size="sm"
                hasIcon
                renderIcon={ShoppingBag}
                kind="tertiary"
                iconDescription="TrashCan"
              >
                Over the shelf
              </Button>
            )}
          </div>
        </TitlePanel>
        <div className="my-timeline">
          {timelines.length > 0 ? (
            <Timeline appointments={timelines} />
          ) : (
            <Heading>You have no timelines yet</Heading>
          )}
        </div>
        <div className="my-prescriptions">
          <AnimatePresence>
            {loading ? (
              <SkeletonPlaceholder style={{ width: "100%", height: "100%" }} />
            ) : (
              visibleTiles.map((tile) => (
                <motion.div
                  key={tile.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <MyExpandableTile
                    id={tile.id}
                    heading={tile.heading}
                    firstUseIcon={tile.firstUseIcon}
                    secondUseIcon={tile.secondUseIcon}
                    thirdUseIcon={tile.thirdUseIcon}
                    spoons={tile.spoons}
                    afterBefore={tile.afterBefore}
                    AmPm={tile.AmPm}
                    daysLeft={tile.daysLeft}
                    description={tile.description}
                    expanded={expandedTile === tile.id}
                    onToggleExpand={handleExpand}
                  />
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
        <div className="pagination">
          <Button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            hasIconOnly
            iconDescription="Previous page"
            renderIcon={ChevronLeft}
          />

          <span>{`Page ${currentPage} of ${totalPages}`}</span>
          <Button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            hasIconOnly
            iconDescription="Next page"
            renderIcon={ChevronRight}
          />
        </div>
      </motion.div>
    </>
  );
}

export default MedicationHub;
