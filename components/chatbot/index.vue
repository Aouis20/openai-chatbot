<script lang="ts" setup>
const { chatCompletion } = useChatgpt();

const chatTree = ref<Record<string, string>[]>([]);
const inputData = ref<string>("");
const aiModel = ref("gpt-3.5-turbo");

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
};

const sendMessage = async () => {
  try {
    const message = {
      role: "user",
      content: `${inputData.value}`,
    };
    inputData.value = "";

    chatTree.value.push(message);

    const response = await chatCompletion(chatTree.value);

    const responseMessage = {
      role: response[0].message.role,
      content: response[0].message.content,
    };

    chatTree.value.push(responseMessage);
  } catch (error) {
    alert(`Join the waiting list if you want to use GPT-4 models: ${error}`);
  }
};
</script>
<template>
  <h1 class="text-3xl text-center font-bold mb-10">Déméter</h1>
  <div class="flex flex-col items-center justify-center">
    <div class="w-4/5">
      <Card
        v-for="(chat, idx) in chatTree"
        :key="idx"
        class="mb-6 py-4 bg-light-gray-500"
      >
        <CardContent>
          <strong>{{ chat.role }} :</strong>
          <div>{{ chat.content }}</div>
        </CardContent>
      </Card>
    </div>
    <div class="grid w-full gap-2 px-32 fixed bottom-0 pb-12 bg-white">
      <Select v-model="aiModel">
        <SelectTrigger class="w-[180px]">
          <SelectValue placeholder="Select a model" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
          <SelectItem value="gpt-4">GPT-4</SelectItem>
        </SelectContent>
      </Select>
      <Textarea
        v-model="inputData"
        :onkeydown="handleKeyDown"
        placeholder="Type your message here."
        class="resize-none shadow-[0_5px_15px_rgba(0,0,0,0.35)]"
        :rows="5"
      />
      <Button @click="sendMessage" class="w-full">Send</Button>
    </div>
  </div>
</template>
