import { Button } from "@nextui-org/button";
import { Skeleton } from "@nextui-org/skeleton";
import { ThumbDown, ThumbUp } from "../icons";
import { useEffect, useState } from "react";

enum VoteType {
  UP,
  DOWN,
}

interface IVoteProps {
  voteId: string;
  initialCounter: number;
}

export default function Vote({ voteId, initialCounter }: IVoteProps) {
  const [vote, setVote] = useState<VoteType | null>(null);
  const [counter, setCounter] = useState<number>(initialCounter);
  const [isLoading, setLoading] = useState(true);

  const sign = counter > 0 ? "+" : "";

  const handleUpVote = () => {
    if (vote === VoteType.UP) {
      setVote(null);
      setCounter(counter - 1);
    } else {
      setCounter(vote === VoteType.DOWN ? counter + 2 : counter + 1);
      setVote(VoteType.UP);
    }
  };

  const handleDownVote = () => {
    if (vote === VoteType.DOWN) {
      setVote(null);
      setCounter(counter + 1);
    } else {
      setCounter(vote === VoteType.UP ? counter - 2 : counter - 1);
      setVote(VoteType.DOWN);
    }
  };

  // Initialize vote state from local storage based on the voteId
  useEffect(() => {
    const storedVote = localStorage.getItem(`voteState_${voteId}`);
    if (storedVote) {
      setVote(Number(storedVote));
    }
    setLoading(false);
  }, [voteId]);

  // Update local storage on vote state change
  useEffect(() => {
    if (vote !== null) {
      localStorage.setItem(`voteState_${voteId}`, vote.toString());
    } else {
      localStorage.removeItem(`voteState_${voteId}`);
    }
  }, [vote, voteId]);

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
