"use client";

import { useState, useEffect, useCallback } from "react";

import { AssistantRuntimeProvider, AssistantCloud } from "@assistant-ui/react";

import { useChatRuntime } from "@assistant-ui/react-ai-sdk";
import { AssistantSidebar } from "@/components/assistant-ui/assistant-sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { UserProfile, UserEvent } from "@memobase/memobase";

import { toast } from "sonner";

import { ThreadList } from "@/components/assistant-ui/example-thread-list";
import { UserMemory } from "@/components/user-memory";
import { Thread } from "@/components/assistant-ui/example-thread";

import { useTranslations } from "next-intl";
import { getMemoryExample, getThreadsExample } from "@/api/models/memobase";
import { ThreadExample } from "@/types";
import CommonHeader from "@/components/common-header";

export default function Page() {
  const t = useTranslations("common");
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [events, setEvents] = useState<UserEvent[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [threads, setThreads] = useState<ThreadExample[]>([]);
  const [thread, setThread] = useState<ThreadExample>();

  const cloud = new AssistantCloud({
    baseUrl: `${process.env["NEXT_PUBLIC_BASE_URL"]}${
      process.env["NEXT_PUBLIC_BASE_PATH"] || ""
    }/api/example`,
    anonymous: true,
  });

  const runtime = useChatRuntime({
    api: `${process.env["NEXT_PUBLIC_BASE_PATH"] || ""}/api/chat`,
    cloud,
  });

  const fetchMemory = async (tid: string) => {
    setIsLoading(true);
    try {
      const res = await getMemoryExample(tid);
      if (res.code === 0 && res.data) {
        setProfiles(res.data.profiles);
        setEvents(res.data.events);
      } else {
        toast.error(res.message || t("getRecordsFailed"));
      }
    } catch {
      toast.error(t("getRecordsFailed"));
    } finally {
      setIsLoading(false);
    }
  };

  const fetchThreads = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getThreadsExample();
      if (res && res.threads) {
        setThreads(res.threads);
      } else {
        toast.error(t("getRecordsFailed"));
      }
    } catch {
      toast.error(t("getRecordsFailed"));
    } finally {
      setIsLoading(false);
    }
  }, [t]);

  useEffect(() => {
    fetchThreads();
  }, [fetchThreads]);

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <SidebarProvider>
        <AppSidebar>
          <ThreadList
            onItemClick={(i) => {
              if (threads.length === 0) return;
              setThread(threads[i]);
              fetchMemory(threads[i].id);
            }}
          />
        </AppSidebar>
        <SidebarInset>
          <CommonHeader />
          <AssistantSidebar
            threadSlot={<Thread thread={thread} isLoading={isLoading} />}
          >
            <UserMemory
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              badge="preview"
              events={events}
              profiles={profiles}
              profilesFold
            />
          </AssistantSidebar>
        </SidebarInset>
      </SidebarProvider>
    </AssistantRuntimeProvider>
  );
}
