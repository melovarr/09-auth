"use client";

interface DetailsErrorProps {
  error: Error;
}

const NoteError = ({ error }: DetailsErrorProps) => {
  return (
    <div>
      <p>Could not fetch note details. {error.message}</p>
    </div>
  );
};

export default NoteError;
