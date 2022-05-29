import { Client } from "@notionhq/client"

const notion = new Client({ auth: process.env.NOTION_KEY })

const databaseId = process.env.NOTION_DATABASE_ID

async function addItem(text) {
  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        title: { 
          title:[
            {
              "text": {
                "content": text
              }
            }
          ]
        }
      },
    })
    console.log(response)
    console.log("Success! Entry added.")
  } catch (error) {
    console.error(error.body)
  }
}

async function passEffortImpact(item, effort, impact) {
    try{
        const dataItem = await notion.databases.query({
            database_id: databaseId,
            filter: {
                or: [
                    {
                    property: "Name",
                    contains: item
                }
                ]
            }
        });
        console.log(dataItem);
    } catch(error) {
        console.error(error.body);
    }
}

passEffortImpact('You should do this task first', 0, 0);