import { AnimatePresence, motion } from "framer-motion";

const ExpandableCard = ({ isActive, onClose, content }) => {
  return (
    <>
      <AnimatePresence>
        {isActive && (
          <div
            className="fixed inset-0 z-50 bg-black/20 grid place-items-center backdrop-blur-sm"
            onClick={onClose} // Close card when clicking outside the card
          >
            {/* Card Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
              onClick={(e) => e.stopPropagation()} // Prevent click propagation to the backdrop
            >
              {/* Close Button */}
              <motion.button
                key="close-button"
                className="absolute top-2 right-2 items-center justify-center bg-white rounded-full h-6 w-6"
                onClick={onClose} // Close card when the close button is clicked
              >
                <CloseIcon />
              </motion.button>

              {/* Card Content */}
              <div className="p-4">
                

                {content}
               
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4 text-black dark:text-white"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M18 6l-12 12" />
    <path d="M6 6l12 12" />
  </svg>
);

export default ExpandableCard;
