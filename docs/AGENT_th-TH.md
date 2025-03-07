# เอเจนต์ที่ขับเคลื่อนด้วย LLM (ReAct)

## เอเจนต์ (ReAct) คืออะไร

เอเจนต์เป็นระบบปัญญาประดิษฐ์ขั้นสูงที่ใช้โมเดลภาษาขนาดใหญ่ (LLMs) เป็นเครื่องยนต์คำนวณหลัก โดยรวมความสามารถในการให้เหตุผลของ LLMs เข้ากับฟังก์ชันเพิ่มเติม เช่น การวางแผนและการใช้เครื่องมือ เพื่อดำเนินงานที่ซับซ้อนได้อย่างอิสระ เอเจนต์สามารถแยกแยะคำสั่งที่ซับซ้อน สร้างโซลูชันทีละขั้นตอน และโต้ตอบกับเครื่องมือหรือ API ภายนอกเพื่อรวบรวมข้อมูลหรือดำเนินงานย่อย

ตัวอย่างนี้ใช้เอเจนต์ตามแนวทาง [ReAct (Reasoning + Acting)](https://www.promptingguide.ai/techniques/react) ReAct ช่วยให้เอเจนต์สามารถแก้ปัญหาที่ซับซ้อนโดยการรวมการให้เหตุผลและการกระทำในวงวนป้อนกลับแบบวนซ้ำ เอเจนต์จะดำเนินการผ่านสามขั้นตอนหลัก: ความคิด การกระทำ และการสังเกต โดยวิเคราะห์สถานการณ์ปัจจุบันโดยใช้ LLM ตัดสินใจเกี่ยวกับการกระทำถัดไป ดำเนินการโดยใช้เครื่องมือหรือ API ที่มีอยู่ และเรียนรู้จากผลลัพธ์ที่สังเกตได้ กระบวนการต่อเนื่องนี้ช่วยให้เอเจนต์สามารถปรับตัวเข้ากับสภาพแวดล้อมที่เปลี่ยนแปลง ปรับปรุงความแม่นยำในการแก้ปัญหา และให้โซลูชันที่คำนึงถึงบริบท

## กรณีใช้งานตัวอย่าง

เอเจนต์ที่ใช้ ReAct สามารถนำไปประยุกต์ใช้ในสถานการณ์ต่าง ๆ เพื่อให้โซลูชันที่แม่นยำและมีประสิทธิภาพ

### ข้อความเป็น SQL

ผู้ใช้ถามถึง "ยอดขายรวมของไตรมาสที่ผ่านมา" เอเจนต์จะตีความคำขอนี้ แปลงเป็นคำสั่ง SQL ดำเนินการกับฐานข้อมูล และนำเสนอผลลัพธ์

### การพยากรณ์ทางการเงิน

นักวิเคราะห์ทางการเงินต้องการพยากรณ์รายได้ของไตรมาสถัดไป เอเจนต์จะรวบรวมข้อมูลที่เกี่ยวข้อง ดำเนินการคำนวณโดยใช้แบบจำลองทางการเงิน และสร้างรายงานพยากรณ์อย่างละเอียด โดยสร้างความมั่นใจในความถูกต้องของการคาดการณ์

## การใช้คุณลักษณะ Agent

เพื่อเปิดใช้งานฟังก์ชัน Agent สำหรับแชทบอทที่กำหนดเองของคุณ ให้ทำตามขั้นตอนเหล่านี้:

1. นำทางไปยังส่วน Agent ในหน้าจอแชทบอทที่กำหนดเอง

2. ในส่วน Agent คุณจะพบรายการเครื่องมือที่สามารถใช้งานได้โดย Agent ตามค่าเริ่มต้น เครื่องมือทั้งหมดจะถูกปิดใช้งาน

3. เพื่อเปิดใช้งานเครื่องมือ เพียงแค่สลับสวิตช์ที่อยู่ถัดจากเครื่องมือที่ต้องการ เมื่อเปิดใช้งานเครื่องมือแล้ว Agent จะสามารถเข้าถึงและใช้งานได้เมื่อประมวลผลคำสอบถามของผู้ใช้

![](./imgs/agent_tools.png)

> [!สำคัญ]
> สิ่งสำคัญคือการเปิดใช้งานเครื่องมือใดๆ ในส่วน Agent จะถือว่าฟังก์ชัน ["ความรู้"](https://aws.amazon.com/what-is/retrieval-augmented-generation/) เป็นเครื่องมือด้วย ซึ่งหมายความว่า LLM จะกำหนดโดยอัตโนมัติว่าจะใช้ "ความรู้" เพื่อตอบคำถามของผู้ใช้ โดยพิจารณาเป็นหนึ่งในเครื่องมือที่มีอยู่

4. ตามค่าเริ่มต้น เครื่องมือ "การค้นหาอินเทอร์เน็ต" จะถูกจัดเตรียมไว้ เครื่องมือนี้ช่วยให้ Agent สามารถดึงข้อมูลจากอินเทอร์เน็ตเพื่อตอบคำถามของผู้ใช้

![](./imgs/agent1.png)
![](./imgs/agent2.png)

เครื่องมือนี้ขึ้นอยู่กับ [DuckDuckGo](https://duckduckgo.com/) ซึ่งมีขีดจำกัดการใช้งาน เหมาะสำหรับการทดลองหรือการสาธิต แต่หากต้องการใช้ในสภาพแวดล้อมการผลิต เราแนะนำให้ใช้ Search API อื่น

5. คุณสามารถพัฒนาและเพิ่มเครื่องมือแบบกำหนดเองเพื่อขยายความสามารถของ Agent ดูที่ส่วน [วิธีพัฒนาเครื่องมือของคุณเอง](#how-to-develop-your-own-tools) สำหรับข้อมูลเพิ่มเติมเกี่ยวกับการสร้างและการรวมเครื่องมือแบบกำหนดเอง

## วิธีพัฒนาเครื่องมือของคุณเอง

เพื่อพัฒนาเครื่องมือแบบกำหนดเองสำหรับ Agent ให้ปฏิบัติตามคำแนะนำเหล่านี้:

- สร้างคลาสใหม่ที่สืบทอดจากคลาส `AgentTool` แม้ว่าอินเทอร์เฟซจะเข้ากันได้กับ LangChain แต่การใช้งานตัวอย่างนี้มี `AgentTool` เป็นของตนเอง ซึ่งคุณควรสืบทอดมา ([แหล่งที่มา](../backend/app/agents/tools/agent_tool.py))

- ดูตัวอย่างการใช้งานของ[เครื่องมือคำนวณ BMI](../examples/agents/tools/bmi/bmi.py) ตัวอย่างนี้แสดงวิธีสร้างเครื่องมือที่คำนวณดัชนีมวลกาย (BMI) ตามข้อมูลที่ผู้ใช้ป้อน

  - ชื่อและคำอธิบายที่ประกาศบนเครื่องมือจะถูกใช้เมื่อ LLM พิจารณาว่าควรใช้เครื่องมือใดเพื่อตอบคำถามของผู้ใช้ กล่าวอีกนัยหนึ่งคือ จะถูกฝังลงในพรอมพ์เมื่อเรียก LLM ดังนั้นขอแนะนำให้อธิบายให้ชัดเจนที่สุด

- [ทางเลือก] เมื่อคุณได้พัฒนาเครื่องมือแบบกำหนดเองแล้ว ขอแนะนำให้ตรวจสอบฟังก์ชันการทำงานโดยใช้สคริปต์ทดสอบ ([ตัวอย่าง](../examples/agents/tools/bmi/test_bmi.py)) สคริปต์นี้จะช่วยให้คุณมั่นใจว่าเครื่องมือของคุณทำงานได้ตามที่คาดหวัง

- หลังจากพัฒนาและทดสอบเครื่องมือแบบกำหนดเองเสร็จสิ้น ให้ย้ายไฟล์การใช้งานไปยังไดเรกทอรี [backend/app/agents/tools/](../backend/app/agents/tools/) จากนั้นเปิด [backend/app/agents/utils.py](../backend/app/agents/utils.py) และแก้ไข `get_available_tools` เพื่อให้ผู้ใช้สามารถเลือกเครื่องมือที่พัฒนาขึ้นได้

- [ทางเลือก] เพิ่มชื่อและคำอธิบายที่ชัดเจนสำหรับส่วนหน้า ขั้นตอนนี้เป็นทางเลือก แต่หากคุณไม่ทำ เครื่องมือชื่อและคำอธิบายที่ประกาศในเครื่องมือของคุณจะถูกใช้ ซึ่งเป็นสำหรับ LLM แต่ไม่ใช่สำหรับผู้ใช้ ดังนั้นขอแนะนำให้เพิ่มคำอธิบายเฉพาะเพื่อปรับปรุง UX

  - แก้ไขไฟล์ i18n เปิด [en/index.ts](../frontend/src/i18n/en/index.ts) และเพิ่ม `name` และ `description` ของคุณใน `agent.tools`
  - แก้ไข `xx/index.ts` ด้วย โดย `xx` แทนรหัสประเทศที่คุณต้องการ

- รัน `npx cdk deploy` เพื่อปรับใช้การเปลี่ยนแปลงของคุณ ซึ่งจะทำให้เครื่องมือแบบกำหนดเองของคุณพร้อมใช้งานในหน้าจอบอทแบบกำหนดเอง

## การมีส่วนร่วม

**ยินดีต้อนรับการมีส่วนร่วมในที่เก็บเครื่องมือนี้!** หากคุณพัฒนาเครื่องมือที่มีประโยชน์และมีการใช้งานที่ดี โปรดพิจารณาการมีส่วนร่วมในโครงการโดยการส่งปัญหาหรือคำขอดึง (pull request)