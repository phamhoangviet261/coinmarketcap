import React from 'react';

type Props = {
  children: React.ReactNode;
};

export default function Box({ children }: Props) {
  return (
    <div className="border border-[#323546] rounded-lg p-2">{children}</div>
  );
}
