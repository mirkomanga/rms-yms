import psycopg2, psycopg2.extras
from conf import configDB, configQueries

class DBManager():



    def get_db_connection():
        conn = None
        params = configDB()
        conn = psycopg2.connect(**params)
        return conn
        
    def release_connection(conn):
        conn.close()
        return
    
    def getAllItems(conn,query_key):
        queries = configQueries()
        statement = queries.get(query_key)
        cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
        cur.execute(statement)
        items = cur.fetchall()
        cur.close()
        return items
        
    def getItem(conn,query_key,filter):
        queries = configQueries()
        statement = queries.get(query_key)
        cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
        cur.execute(statement + str(filter))
        item = cur.fetchone()
        cur.close()
        return item

    def check_connection():
        """ Connect to the PostgreSQL database server """
        conn = None
        try:
            # read connection parameters
            params = configDB()

            # connect to the PostgreSQL server
            print('Connecting to the PostgreSQL database...')
            conn = psycopg2.connect(**params)
            
            # create a cursor
            cur = conn.cursor()
            
        # execute a statement
            print('PostgreSQL database version:')
            cur.execute('SELECT version()')

            # display the PostgreSQL database server version
            db_version = cur.fetchone()
            print(db_version)
           
        # close the communication with the PostgreSQL
            cur.close()
        except (Exception, psycopg2.DatabaseError) as error:
            print(error)
        finally:
            if conn is not None:
                conn.close()
                print('Database connection closed.')
    
    def saveOrUpdate(conn, mode, formObj, cr_id):
        keys = list(formObj.keys())
        values = list(formObj.values())
        kvMap = {}
        fieldLenght  = len(keys)
        if mode == 'upd' :
            query = 'UPDATE t_bi_obj_asis set'
            for i in range(fieldLenght) :
                if (keys[i] != 'submit'):
                    query = query + " "+keys[i]+" = "
                    value = values[i]
                    if (keys[i] == 'casewise_class_app_id' and (value == '' or value == 'None')):
                        value = 0
                    isInt = False
                    try: 
                        int(value)
                        isInt = True
                    except ValueError:
                        isInt = False
                    if isInt:
                        query = query + str(value) + ","
                    else:
                        value = value.replace("'","''")
                        query = query + "'" + value + "',"
            query = query + " cr_time_last_update = now() "
            query = query + " where CR_ID = "+cr_id+";"
            print('QUERY: ' + query)
            cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
            cur.execute(query)
            conn.commit()
            cur.close()
            return cr_id
        else:
            colNames = ", ".join(keys)
            colNames = colNames.replace("submit, ","")
            query = "INSERT INTO t_bi_obj_asis (" + colNames + ", cr_time_insert) VALUES("
            for i in range(fieldLenght) :
                if (keys[i] != 'submit'):
                    value = values[i]
                    if (keys[i] == 'casewise_class_app_id' and value == ''):
                        value = 0
                    isInt = False
                    try: 
                        int(value)
                        isInt = True
                    except ValueError:
                        isInt = False
                    if isInt:
                        query = query + str(value) + ","
                    else:
                        value = value.replace("'","''")
                        query = query + "'" + value + "',"
            #query = query[:-1]
            query = query + " now()) RETURNING cr_id;"
            print('QUERY: ' + query)
            cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
            cur.execute(query)
            _new_cr_id_ = cur.fetchone()[0]
            print('NEW_UUID: ' + str(_new_cr_id_) )
            conn.commit()
            cur.close()
            return _new_cr_id_
