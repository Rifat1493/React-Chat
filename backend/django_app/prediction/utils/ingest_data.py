# import sys
# import os
# parent_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
# sys.path.append(parent_dir)

import chromadb
from django.conf import settings
from langchain.text_splitter import CharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_community.document_loaders import PyMuPDFLoader
from langchain.chains import RetrievalQA
from .util import get_embeddings, get_llm_rag
import warnings
warnings.filterwarnings("ignore")
collection_name='random'
def upload_pdf_data(file_url, file_name):
    cache_folder = "prediction/media/"
    collection_name = file_name
    chroma_client = chromadb.PersistentClient(path=cache_folder)
    # If you have created the collection before, you need to delete the collection first
    if len(chroma_client.list_collections()) > 0 and collection_name in [
        chroma_client.list_collections()[0].name
    ]:
        chroma_client.delete_collection(name=collection_name)

    print(f"Creating collection: '{collection_name}'")  
    pdf_loader = PyMuPDFLoader(settings.BASE_DIR+file_url)
    documents = pdf_loader.load()
    text_splitter = CharacterTextSplitter(chunk_size=250, chunk_overlap=10)
    texts = text_splitter.split_documents(documents)

    embeddings = get_embeddings()

    # create the vectorestore to use as the index
    Chroma.from_documents(
        documents=texts,
        embedding=embeddings,
        collection_name=collection_name,
        persist_directory=cache_folder,
    )

    print("Collection has been created successfully")


def get_doc_executor():
    db_index = Chroma(
        collection_name,
        embedding_function=get_embeddings(),
        persist_directory='prediction/media/',
    )
    # expose this index in a retriever interface
    retriever = db_index.as_retriever(search_type="similarity", search_kwargs={"k": 2})

    doc_executor = RetrievalQA.from_chain_type(
        llm=get_llm_rag(), chain_type="stuff", retriever=retriever
    )

    return doc_executor

