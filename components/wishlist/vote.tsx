"use client";

import { Button } from "@nextui-org/button";
import { ThumbDown, ThumbUp } from "../icons";
import { useEffect, useState } from "react";
import { updateWishCounter } from "@/app/actions";

enum VoteType {
  UP,
  DOWN,
}

interface IVoteProps {
  id: string;
  initialCounter: number;
}

const calculateDelta = (currentVote: VoteType | null, newVote: VoteType) => {
  const isUpvote = newVote === VoteType.UP;
  const isDownvote = newVote === VoteType.DOWN;
  const noVote = currentVote === null;

  let delta = 0;
  if (noVote) {
    delta = isUpvote ? 1 : -1;
  } else if (currentVote === VoteType.UP && isDownvote) {
    delta = -2; // Remove upvote and add downvote
  } else if (currentVote === VoteType.DOWN && isUpvote) {
    delta = 2; // Remove downvote and add upvote
  } else {
    // This condition is for toggling the same vote off
    delta = isUpvote ? -1 : 1; // Toggle off
  }
  return delta;
};

export default function Vote({ id, initialCounter }: IVoteProps) {
  const [vote, setVote] = useState<VoteType | null>(null);
  const [counter, setCounter] = useState<number>(initialCounter);
  const [isLoading, setLoading] = useState(true);

  const sign = counter > 0 ? "+" : "";

  const handleVoteChange = async (newVote: VoteType) => {
    const delta = calculateDelta(vote, newVote);
    const newCounter = await updateWishCounter(id, delta);
    if (newCounter !== undefined) setCounter(newCounter);
    setVote((prevVote) => (prevVote === newVote ? null : newVote));
  };

  const handleUpVote = () => {
    handleVoteChange(VoteType.UP);
  };

  const handleDownVote = () => {
    handleVoteChange(VoteType.DOWN);
  };

  // Initialize vote state from local storage based on the id
  useEffect(() => {
    const storedVote = localStorage.getItem(`voteState_${id}`);
    if (storedVote) {
      setVote(Number(storedVote));
    }
    setLoading(false);
  }, [id]);

  // Update local storage on vote state change
  useEffect(() => {
    if (vote !== null) {
      localStorage.setItem(`voteState_${id}`, vote.toString());
    } else {
      localStorage.removeItem(`voteState_${id}`);
    }
  }, [vote, id]);

  return (
    <div className="flex flex-col gap-1 items-center">
      <Button
        disabled={isLoading}
        isIconOnly
        color="danger"
        aria-label="Vote Up"
        onClick={handleUpVote}
        variant={vote === VoteType.UP ? "solid" : "faded"}
      >
        <ThumbUp />
      </Button>
      <span className="font-bold">
        {sign}
        {counter}
      </span>
      <Button
        disabled={isLoading}
        isIconOnly
        color="danger"
        aria-label="Vote Down"
        onClick={handleDownVote}
        variant={vote === VoteType.DOWN ? "solid" : "faded"}
      >
        <ThumbDown />
      </Button>
    </div>
  );
}
